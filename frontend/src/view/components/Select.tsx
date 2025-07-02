import * as RdxSelect from "@radix-ui/react-select";
import {
	ChevronDownIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface SelectProps {
  placeholder: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange(value: string): void;
  value?: string;
}

export function Select({ error, options, placeholder, value, onChange}: SelectProps) {
  function handleSelect(value: string) {
    onChange?.(value);
  }

  return(
    <div>
      <RdxSelect.Root value={value} onValueChange={handleSelect}>
        <RdxSelect.Trigger
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transaction-all outline-none text-left relative",
            error && "!border-red-900"
          )}
        >
          <RdxSelect.Value placeholder={placeholder} />

          <RdxSelect.Icon className="absolute right-3">
            <ChevronDownIcon className="w-6 h-6 text-gray-800"/>
          </RdxSelect.Icon>
        </RdxSelect.Trigger>

        <RdxSelect.Portal>
          <RdxSelect.Content className="overflow-hidden rounded-2xl z-99 bg-white border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
            <RdxSelect.Viewport className="p-2">
              {options.map(option => (
                <RdxSelect.Item
                  className="text-gray-800 p-4 text-sm outline-none data-[state=checked]:font-bold data-[highlighted]:bg-gray-50 rounded-lg transition-colors"
                  value={option.value}
                  key={option.value}
                >
                  <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                </RdxSelect.Item>
              ))}
            </RdxSelect.Viewport>
          </RdxSelect.Content>
        </RdxSelect.Portal>
      </RdxSelect.Root>

      {error &&
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <span className="text-xs">{error}</span>
          <CrossCircledIcon />
        </div>}
    </div>
  );
}
