import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboardContext();
  return({
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  });
}
