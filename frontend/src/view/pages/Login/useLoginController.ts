import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import type { SigninParams } from "../../../app/services/authService/signin";

const schema = z.object({
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("O formato do e-mail é inválido"),
  password: z.string()
    .nonempty("A senha é obrigatória")
    .min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
   } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
  });

  // permite fazer uma conta e já deixar o user logado
  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async(data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
