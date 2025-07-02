import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { useState } from "react";
import { formatDate } from "../../app/utils/formatDate";
import { Popover } from "./Popover";
import { DatePicker } from "./DatePicker";

interface DatePickerInputProps {
  className?: string;
  error?: boolean;
}

export function DatePickerInput({ className,  error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return(
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4 peer placeholder-shown:pt-1",
              className,
              error && "!border-red-900"
            )}
          >
            <span className="absolute text-xs text-gray-700 left-[13px] top-2 pointer-events-none">Data</span>
            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
          />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <span className="text-xs">{error}</span>
          <CrossCircledIcon />
        </div>
      )}
    </div>

  );
}
