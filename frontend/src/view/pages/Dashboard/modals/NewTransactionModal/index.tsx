import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
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
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return(
    <Modal
      title={isExpense ? "Nova Despesa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>

            <Controller
              name="value"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? "Nome da despesa" : "Nome da receita"}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="bankAccountId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Selecione a conta"
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categoria"
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            isPending={isPending}
          >
            Criar
          </Button>
        </div>
      </form>

    </Modal>

  );
}
