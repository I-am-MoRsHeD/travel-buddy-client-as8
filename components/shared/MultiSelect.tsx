"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";

export function MultiSelect({
    name,
    options,
    defaultValues = [],
    label = "Select",
}: {
    name: string;
    options: { label: string; value: string }[];
    defaultValues?: string[];
    label?: string;
}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>(defaultValues);

    const toggle = (value: string) => {
        setSelected((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]
        );
    };

    return (
        <div className="space-y-3">
            {/* Main Select Button */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm",
                            "bg-background hover:bg-accent/30"
                        )}
                    >
                        <span className="truncate">
                            {selected.length === 0
                                ? label
                                : `${selected.length} selected`}
                        </span>
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-full overflow-y-scroll max-h-96 border-none">
                    <Command>
                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                        <CommandEmpty>No results found.</CommandEmpty>

                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    onSelect={() => toggle(opt.value)}
                                    className="cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.includes(opt.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {/* Selected Badges */}
            <div className="flex flex-wrap gap-2">
                {selected.map((v) => {
                    const item = options.find((o) => o.value === v);
                    if (!item) return null;

                    return (
                        <Badge
                            key={v}
                            variant="secondary"
                            className="px-3 py-1 rounded-md"
                        >
                            {item.label}
                        </Badge>
                    );
                })}
            </div>

            {/* Hidden Inputs for Form Submission */}
            {selected.map((v) => (
                <input key={v} type="hidden" name={name} value={v} />
            ))}
        </div>
    );
}
