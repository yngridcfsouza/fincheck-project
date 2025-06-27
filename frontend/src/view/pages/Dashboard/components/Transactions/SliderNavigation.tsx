import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useSwiper } from "swiper/react";

/* interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
} */

export function SliderNavigation(/* { isBeginning, isEnd }: SliderNavigationProps */) {
  const swiper = useSwiper();

  return(
  <div>
    <button
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-r from-gray-100 to-transparent flex items-center justify-center"
      onClick={() => swiper.slidePrev()}
      /* disabled={isBeginning} */
    >
      <ChevronLeftIcon className="text-gray-800 w-6 h-6"/>
    </button>

    <button
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gradient-to-l from-gray-100 to-transparent flex items-center justify-center"
      onClick={() => swiper.slideNext()}
      /* disabled={isEnd} */
    >
      <ChevronRightIcon className="text-gray-800 w-6 h-6"/>
    </button>
  </div>
  );
}
