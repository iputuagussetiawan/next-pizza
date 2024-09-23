'use client';

import { cn } from "@/lib/utils";
import { useCategoryStore } from '@/store/category';

interface Props {
    className?: string;
}

const cats = [
    {id:1, name:"Margherita"},
    {id:2, name:"Pepperoni"},
    {id:3, name:"BBQ Chicken"},
    {id:4, name:"Hawaiian"},
    {id:5, name:"Meat Lover's"},
    {id:6, name:"Four Cheese"},
    {id:7, name:"Supreme"},
];

const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
    const activeId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex flex-wrap gap-1 bg-gray-50 p-1 rounded-2xl ', className)}>
            {cats.map(({name,id}, index) => (
                <a href={`#${name}`}
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        activeId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )}
                    key={index}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};