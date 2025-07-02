import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModal } from "./useNewAccountModal";

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen } = useNewAccountModal();

  return(
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
      <form>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo</span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Nome da Conta"
          />

          <Select
            placeholder="Selecione um tipo de conta"
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

          <ColorsDropdownInput />
        </div>
      </form>

    </Modal>

  );
}
