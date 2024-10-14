'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '..';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface Props {
    product: ProductWithRelations;
    className?:string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    const router =useRouter();
    return (
        <Dialog open={Boolean(product)} onOpenChange={()=>router.back()}>
            <DialogContent className={cn(className,"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")} >
                <ProductForm product={product} onSubmit={()=>router.back()}/>
            </DialogContent>
        </Dialog>
    );
};
