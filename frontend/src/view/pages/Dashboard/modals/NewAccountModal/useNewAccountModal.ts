import { useDashboardContext } from "../../components/DashboardContext/useDashboardContext";

export function useNewAccountModal() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboardContext();
  return({
    isNewAccountModalOpen,
    closeNewAccountModal,
  });
}
