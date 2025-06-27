import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import type { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";


const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  email: z.string()
    .nonempty("O e-mail é obrigatório")
    .email("O formato do e-mail é inválido"),
  password: z.string()
    .nonempty("A senha é obrigatória")
    .min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
   } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
  });

  const { signin } = useAuth();

  const handleSubmit = hookFormSubmit(async(data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);

      toast.success("Sucesso ao criar sua conta!");
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
