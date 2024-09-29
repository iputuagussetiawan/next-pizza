'use client';

import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

interface Props {
    items: readonly Variant[];
    defaultValue?: string;
    onClick?: (value: Variant['value']) => void;
    className?: string;
    selectedValue?: Variant['value'];
}

export const GroupVariants: React.FC<Props> = ({ items, onClick, className, selectedValue }) => {
    return (
        <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none')}>
            {items.map((item) => (
                <div
                    key={item.name}
                    onClick={() => !item.disabled && onClick?.(item.value)} // Prevent click when disabled
                    className={cn(
                        'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                        {
                            'bg-white shadow': item.value === selectedValue,  // Highlight selected item
                            'text-gray-500 opacity-50 pointer-events-none': item.disabled,  // Disabled style
                        }
                    )}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};