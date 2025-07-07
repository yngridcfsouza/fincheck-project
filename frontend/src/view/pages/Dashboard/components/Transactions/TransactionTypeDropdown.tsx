import { DropdownMenu } from "../../../../components/DropdownMenu";

import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface TransactionTypeDropdownProps {
  onSelect(type: "INCOME" | "EXPENSE" | undefined): void;
  selectedType: "INCOME" | "EXPENSE" | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  return(
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2">
          {selectedType === "INCOME" && <IncomeIcon />}
          {selectedType === "EXPENSE" && <ExpensesIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "INCOME" && "Receitas"}
            {selectedType === "EXPENSE" && "Despesas"}
            {selectedType === undefined && "Transações"}
          </span>

          <ChevronDownIcon className="text-gray-900"/>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[200px] flex flex-col justify-between">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect("EXPENSE")}>
          <ExpensesIcon />
          Despesas
        </DropdownMenu.Item>
        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
