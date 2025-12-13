"use strict";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

/**
 * Option type for the MultiSelect component
 */
export interface MultiSelectOption {
  label: string;
  value: string;
}

/**
 * Props for the MultiSelect component
 */
interface MultiSelectProps {
  /**
   * The options to select from.
   */
  options: MultiSelectOption[];

  /**
   * The currently selected values (array of string values).
   */
  value: string[];

  /**
   * Callback when selection changes.
   */
  onValueChange: (value: string[]) => void;

  /**
   * Placeholder text when no items are selected.
   */
  placeholder?: string;

  /**
   * Disabled state.
   */
  disabled?: boolean;

  /**
   * Additional class names.
   */
  className?: string;

  /**
   * Additional class names for the popover content.
   */
  popoverClassName?: string;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select options...",
  disabled = false,
  className,
  popoverClassName,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onValueChange(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange(value.filter((v) => v !== optionValue));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          aria-disabled={disabled}
          className={cn(
            // Base styles matching SelectTrigger from src/components/ui/select.tsx
            "flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            // Custom styles for handling multiple lines of badges if needed, or keeping it compact
            "h-auto",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          onClick={() => !disabled && setOpen(!open)}
        >
          <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
            {value.length > 0 ? (
              value.map((val) => {
                const option = options.find((o) => o.value === val);
                return (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="bg-slate-700/50 hover:bg-slate-700/70 text-slate-100 border-slate-600"
                  >
                    {option?.label || val}
                    <div
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer flex items-center justify-center"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRemove(val, e as any);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleRemove(val, e)}
                    >
                      <X className="h-3 w-3 text-slate-400 hover:text-slate-100" />
                      <span className="sr-only">Remove {option?.label}</span>
                    </div>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full p-0 bg-popover text-popover-foreground",
          popoverClassName,
        )}
        style={{
          width: "var(--radix-popover-trigger-width)",
          maxHeight: "var(--radix-popover-content-available-height)",
        }}
      >
        <Command className="bg-transparent h-full max-h-none">
          <CommandList className="max-h-[var(--radix-popover-content-available-height)] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className="cursor-pointer text-slate-100 aria-selected:bg-slate-700/50 aria-selected:text-slate-100"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      value.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <Check className={cn("h-4 w-4")} />
                  </div>
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
