'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';



interface Props {
    title: string;
    products: any[];
    className?: string;
    listClassName?: string;
    categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
    title,
    products,
    listClassName,
    categoryId, // Ensure to use this or remove it if not needed
    className,
}) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });
    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
            console.log(title, categoryId);
        }
    }, [categoryId,title,intersection?.isIntersecting]);
    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product, i) => {
                    // Safely check if product.items exists and has elements
                    const price = product.items?.[0]?.price || 'N/A'; // Handle missing price
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={price}
                        />
                    );
                })}
            </div>
        </div>
    );
};