import { z } from "zod";
import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewTransactionParams } from "../../../../../app/services/transactionsService/create";
import { transactionsService } from "../../../../../app/services/transactionsService";
import toast from "react-hot-toast";

const schema = z.object({
  value: z.string().nonempty('O valor é obrigatório'),
  name: z.string().nonempty('O nome é obrigatório'),
  categoryId: z.string().nonempty('A categoria é obrigatória'),
  bankAccountId: z.string().nonempty('A conta é obrigatória'),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
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

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: NewTransactionParams) => {
      return transactionsService.create(data);
    },
  });

  //implementar um filtro para ter categories de income e expense
  const categories = useMemo(() => {
    return categoriesList.filter(
      category => category.type === newTransactionType
    )
  }, [categoriesList, newTransactionType]);

  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: Number(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"]});
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"]});

      toast.success("Nova transação cadastrada com sucesso!");
      closeNewTransactionModal();
      reset();
    } catch {
      toast.error("Erro ao cadastrar a transação !")
    }
  });

  return({
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isPending,
  });
}
