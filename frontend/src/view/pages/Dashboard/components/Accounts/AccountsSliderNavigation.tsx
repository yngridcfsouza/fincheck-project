import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface AccountsSliderNavigationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  swiper: any;
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation({swiper, isBeginning, isEnd }: AccountsSliderNavigationProps) {
  return(
  <div>
    <button
      className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      onClick={() => swiper?.slidePrev()}
      disabled={isBeginning}
    >
      <ChevronLeftIcon className="text-white w-6 h-6"/>
    </button>

    <button
      className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
      onClick={() => swiper?.slideNext()}
      disabled={isEnd}
    >
      <ChevronRightIcon className="text-white w-6 h-6"/>
    </button>
  </div>
  );
}
