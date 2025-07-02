import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { capitalizeFirstLetter } from '../../app/utils/capitalizeFirstLetter';

interface DatePickerProps {
  value: Date;
  onChange?(date: Date): void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        // Container geral
        root: "flex",
        months: "flex flex-col relative",
        month_caption: "flex items-center mb-4",
        caption_label: "relative left-0 text-lg font-semibold text-gray-700 mx-1",

        nav: "absolute right-0 flex items-center",
        button_previous: "text-teal-800 bg-transparent p-1 rounded-full hover:bg-teal-100",
        button_next: "text-teal-800 bg-transparent p-1 rounded-full hover:bg-teal-100",

        // Cabeçalho dos dias da semana
        weekdays: "flex",
        weekday: "w-10 text-center uppercase text-xs text-gray-500 font-medium",

        // Todas as linhas (semanas)
        week: "flex mb-1",

        // Dias
        day: "text-gray-700 cursor-pointer hover:bg-teal-100 rounded-full w-10 h-10 flex items-center justify-center",
        today: "bg-gray-100 font-bold text-gray-900",
        selected: "bg-teal-900 text-white font-medium",
        outside: "text-gray-300",
      }}

      formatters={{
        formatCaption: (date, options) => {
          return (
            <span>
            {capitalizeFirstLetter(format(date, 'LLLL yyyy', options))}
            </span>
          );
        },
      }}
    />
  );
}
