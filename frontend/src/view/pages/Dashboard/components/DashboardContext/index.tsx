import { createContext, useCallback, useState } from "react";

interface DashboardProviderProps {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  toggleValuesVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardProviderProps)

export function DashboardProvider({ children }: {children: React.ReactNode}) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen((prevState) => !prevState)
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen((prevState) => !prevState)
  }, []);

  return(
    <DashboardContext.Provider value={{
      areValuesVisible,
      toggleValuesVisibility,
      isNewAccountModalOpen,
      openNewAccountModal,
      closeNewAccountModal,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}
