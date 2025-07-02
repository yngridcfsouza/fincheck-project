import { z } from "zod";
import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("Nome da conta é obrigatória"),
	initialBalance: z.string().nonempty("Saldo inicial é obrigatório"),
	color: z.string().nonempty("A cor é obrigatória"),
	type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
});

type FormData = z.infer<typeof schema>

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboardContext();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit(async(data) => {
    console.log(data);
  });

  return({
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
  });
}
