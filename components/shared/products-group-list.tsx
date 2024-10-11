'use client';

import React from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '@/@types/prisma';



interface Props {
    title: string;
    products: ProductWithRelations[];
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
            // console.log(title, categoryId);
        }
    }, [categoryId,title,intersection?.isIntersecting, setActiveId]);
    return (
        <div className={className} id={title} ref={intersectionRef}>
            <Title text={title} size="lg" className="font-extrabold mb-5" />
            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {products.map((product) => {
                    // Safely check if product.items exists and has elements
                    //const price = Number(product.items?.[0]?.price) || 0; // Handle missing price

                    // console.log(product.items);
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            price={product.items[0].price}
                            ingredients={product.ingredients}
                        />
                    );
                })}
            </div>
        </div>
    );
};