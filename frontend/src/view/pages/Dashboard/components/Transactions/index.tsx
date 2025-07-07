import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { cn } from "../../../../../app/utils/cn";
import { useTransactionsController } from "./useTransactionsController";
import { Spinner } from "../../../../components/Spinner";

import emptyState from "../../../../../assets/emptyState.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    isLoading,
    isInitialLoading,
    transactions,
    handleCloseFiltersModal,
    handleOpenFiltersModal,
    isFiltersModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdit,
    handleOpenEditModal,
    handleCloseEditModal,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return(
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      {isInitialLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className="w-10 h-10"/>
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                onSlideChange={swiper => {
                  handleChangeFilters("month")(swiper.realIndex);
                }}
                initialSlide={filters.month}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                    <SwiperSlide key={month}>
                      {({ isActive }) => (
                        <SliderOption
                          isActive={isActive}
                          month={month}
                          index={index}
                        />
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {isLoading && (
              <div className='w-full h-full flex items-center justify-center'>
                <Spinner className="w-10 h-10"/>
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyState} />
                <span className="text-gray-700">Não encontramos nenhuma transação!</span>
              </div>
            )}

            {(hasTransactions && !isLoading) && (
              <>
                {transactionBeingEdit && (
                  <EditTransactionModal
                  open={isEditModalOpen}
                  onClose={handleCloseEditModal}
                  transaction={transactionBeingEdit}
                />
                )}

                {transactions.map(transaction => (
                  <div
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon type={transaction.type === "INCOME" ? 'income' : 'expense'}/>

                      <div >
                        <strong className="tracking-[-0.5px] font-bold block">{transaction.name}</strong>
                        <span className="text-sm text-gray-600 tracking-[-0.5px] font-medium">{formatDate(new Date(transaction.date))}</span>
                      </div>
                    </div>

                    <span className={cn(
                      "tracking-[-0.5px] font-medium",
                      transaction.type === "INCOME" ?
                      "text-green-800" :
                      "text-red-800",
                      !areValuesVisible && "blur-sm"
                    )}>
                      {transaction.type === "INCOME" ?
                      "+ " :
                      "- "} {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
