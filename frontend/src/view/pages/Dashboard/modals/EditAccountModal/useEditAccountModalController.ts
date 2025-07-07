import { z } from "zod";
import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import toast from "react-hot-toast";
import type { UpdateBankAccountParams } from "../../../../../app/services/bankAccountsService/update";
import { useState } from "react";

const schema = z.object({
  name: z.string().nonempty("Saldo inicial é obrigatório"),
	initialBalance: z.union([
    z.string().nonempty("Nome da conta é obrigatória"),
    z.number(),
  ]),
	color: z.string().nonempty("A cor é obrigatória"),
	type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
});

type FormData = z.infer<typeof schema>

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdit,
  } = useDashboardContext();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdit?.name,
      initialBalance: accountBeingEdit?.initialBalance.toFixed(2),
      color: accountBeingEdit?.color,
      type: accountBeingEdit?.type,
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    mutateAsync: updateAccount,
    isPending,
  } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountsService.update(data);
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: Number(data.initialBalance),
        id: accountBeingEdit!.id,
        // non-null assertion: para garantir ao id que espera uma string, afirmamos que não vai ser null
      });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("A conta foi editada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao editar a conta!")
    }
  });

  // Deleção de contas

  const {
    isPending: isPendingDeleteAccount,
    mutateAsync: removeAccount,
  } = useMutation({
    mutationFn: async (id: string) => {
      return bankAccountsService.remove(id);
    },
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdit!.id);
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("A conta foi excluída com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao exluir a conta!")
    }
  };

  return({
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    control,
    isPending,
    handleSubmit,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isPendingDeleteAccount,
  });
}
