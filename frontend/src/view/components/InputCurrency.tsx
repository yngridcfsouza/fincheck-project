import { CrossCircledIcon } from '@radix-ui/react-icons';
import { NumericFormat } from 'react-number-format';

interface InputCurrencyProps {
  error?: string;
  value?: string;
  onChange(value: string): void;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return(
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onValueChange={(values) => {
          onChange(values.value); // `values.value` é o número sem separadores
        }}
        className="w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
      />

      {error &&
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <span className="text-xs">{error}</span>
          <CrossCircledIcon />
        </div>}
    </div>
  );
}
