import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DIAL_CODES,
  formatDialCodeLabel,
  getDialCodeOptionByCountryId,
} from "@/lib/dial-codes";
import { cn } from "@/lib/utils";

type PhoneCountrySelectProps = {
  value: string;
  onChange: (countryId: string) => void;
  className?: string;
};

export function PhoneCountrySelect({ value, onChange, className }: PhoneCountrySelectProps) {
  const [open, setOpen] = useState(false);
  const selected = getDialCodeOptionByCountryId(value) ?? getDialCodeOptionByCountryId("CA");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label="Indicatif régional"
          className={cn(
            "flex w-[min(38vw,9.5rem)] shrink-0 items-center justify-between gap-1.5 rounded-xl border-2 border-line/60 bg-white px-2.5 py-3 text-left text-[13px] transition focus:border-brand-primary focus:outline-none sm:w-[min(100%,220px)] sm:gap-2 sm:px-3 sm:text-[15px]",
            className,
          )}
        >
          <span className="truncate">
            {selected ? formatDialCodeLabel(selected) : "Choisir un pays"}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="z-[100] w-[280px] overflow-hidden border-2 border-line/60 bg-white p-0 shadow-xl"
        align="start"
      >
        <Command className="bg-white">
          <CommandInput
            placeholder="Rechercher un pays ou un indicatif..."
            className="bg-white"
          />
          <CommandList className="bg-white">
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup>
              {DIAL_CODES.map((entry) => (
                <CommandItem
                  key={entry.id}
                  value={`${entry.country} ${entry.code}`}
                  className="bg-white data-[selected=true]:bg-soft-card"
                  onSelect={() => {
                    onChange(entry.id);
                    setOpen(false);
                  }}
                >
                  {formatDialCodeLabel(entry)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
