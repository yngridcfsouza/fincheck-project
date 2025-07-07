import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import type { Transaction } from "../../../../../app/entities/Transaction";
import type { UpdateTransactionParams } from "../../../../../app/services/transactionsService/update";

const schema = z.object({
  value: z.union([
    z.string().nonempty('O valor é obrigatório'),
    z.number(),
  ]),
  name: z.string().nonempty('O nome é obrigatório'),
  categoryId: z.string().nonempty('A categoria é obrigatória'),
  bankAccountId: z.string().nonempty('A conta é obrigatória'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose:() => void
) {

  // Edição de transações

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: UpdateTransactionParams) => {
      return transactionsService.update(data);
    },
  });

  //implementar um filtro para ter categories de income e expense
  const categories = useMemo(() => {
    return categoriesList.filter(
      category => category.type === transaction?.type
    )
  }, [categoriesList, transaction]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: Number(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("Transação editada com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao editar a transação !")
    }
  });

  //Deleção de transações

  const {
    isPending: isDeletePending,
    mutateAsync: removeTransaction,
  } = useMutation({
    mutationFn: async (id: string) => {
      return transactionsService.remove(id);
    },
  });

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("A transação foi excluída com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao exluir a transação!")
    }
  };

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return({
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
    isDeleteModalOpen,
    isDeletePending,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  });
}
