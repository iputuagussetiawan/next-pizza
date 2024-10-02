'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Title } from '../title';
import { Product } from '@prisma/client';
import { cn } from '@/lib/utils';

interface Props {
    product: Product;
    className?:string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
    return (
        <Dialog open={Boolean(product)}>
            <DialogContent className={cn(className,"p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")} >
                <Title text={product.name}/>
            </DialogContent>
        </Dialog>
    );
};
