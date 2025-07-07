import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
  } = useNewAccountModalController();

  return(
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>

            <Controller
              name="initialBalance"
              control={control}
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
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
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Selecione um tipo de conta"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: "CHECKING",
                    label: 'Conta corrente',
                  },
                  {
                    value: "INVESTMENT",
                    label: 'Investimentos',
                  },
                  {
                    value: "CASH",
                    label: 'Dinheiro físico',
                  },
                ]}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
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
