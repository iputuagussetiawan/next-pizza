'use client';

import React from 'react';


import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '..';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCartStore } from '@/store/cart';

interface Props {
    product: ProductWithRelations;
    className?:string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router =useRouter();
    const firstItem=product.items[0]
    const isPizzaForm=Boolean(firstItem.pizzaType) ;
    const addCartItem=useCartStore(state=>state.addCartItem);
    const onAddProduct=()=>{
        addCartItem({
            productItemId:firstItem.id,
        })
    }
    const onAddPizza=(productItemId:number, ingredientsIds:number[])=>{
        
    }
    return (
        <Dialog open={Boolean(product)} onOpenChange={()=>router.back()}>
            <DialogContent className={cn(className,"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")} >
                {
                    isPizzaForm?(
                        <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
                    ):(
                        <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>
                    )
                }
            </DialogContent>
        </Dialog>
    );
};
