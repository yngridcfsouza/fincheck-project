import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropdownMenu";
import { BankAccountIcon } from "../../../../components/icons/BankAccountIcon";
import { Income } from "../../../../components/icons/categories/income/Income";
import { Expense } from "../../../../components/icons/categories/expense/Expense";
import { useDashboardContext } from "../DashboardContext/useDashboardContext";

export function Fab() {
  const { openNewAccountModal } = useDashboardContext();

  return(
    <div className="fixed right-4 bottom-4 bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center text-white">
      <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className=""
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="w-[200px] flex flex-col justify-between">
            <DropdownMenu.Item className="gap-2">
              <Expense />
              Nova Despesa
            </DropdownMenu.Item>
            <DropdownMenu.Item className="gap-2">
              <Income/>
              Nova Receita
            </DropdownMenu.Item>
            <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
              <BankAccountIcon />
              Nova Conta
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
  );
}
