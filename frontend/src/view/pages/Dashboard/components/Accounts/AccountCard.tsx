import type { BankAccount } from "../../../../../app/entities/BankAccount";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../../components/icons/BankAccountTypeIcon";
import { useDashboardContext } from "../DashboardContext/useDashboardContext";

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { name, currentBalance, color, type } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboardContext();

  return(
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950 cursor-pointer"
      style={{ borderBottomColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type}/>
        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">{name}</span>
      </div>

      <div>
        <span className={cn(
          "text-gray-800 font-medium tracking-[-0.5px] mt-4 block",
          !areValuesVisible && "blur-sm"
        )}>
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
}
