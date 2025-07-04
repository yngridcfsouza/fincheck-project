import { z } from "zod";
import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import type { BankAccountParams } from "../../../../../app/services/bankAccountsService/create";
import toast from "react-hot-toast";

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
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: BankAccountParams) => {
      return bankAccountsService.create(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: Number(data.initialBalance),
      });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("Conta cadastrada com sucesso!");
      closeNewAccountModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta!")
    }
  });

  return({
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  });
}
