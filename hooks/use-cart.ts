
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { CartStateItem, useCartStore } from '@/store/cart';
import { CartItem } from '@prisma/client';
import React from 'react';

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (runFetch?: boolean): ReturnProps => {
    // const totalAmount=useCartStore(state => state.totalAmount);
    // const items=useCartStore(state => state.items);
    // const fetchCartItems = useCartStore(state => state.fetchCartItems);
    // const updateItemQuantity=useCartStore(state => state.updateItemQuantity);
    // const removeCartItem=useCartStore(state => state.removeCartItem);
    // const loading=useCartStore(state => state.loading);
    // const addCartItem=useCartStore(state => state.addCartItem);

    const [
        totalAmount,
        items,
        fetchCartItems,
        loading,
        addCartItem,
        updateItemQuantity,
        removeCartItem,
    ] = useCartStore((state) => [
        state.totalAmount,
        state.items,
        state.fetchCartItems,
        state.loading,
        state.addCartItem,
        state.updateItemQuantity,
        state.removeCartItem,
    ]);

    React.useEffect(() => {
        if (runFetch) {
            fetchCartItems();
        }
    }, []);
    


    return {
        totalAmount,
        items,
        loading,
        updateItemQuantity,
        removeCartItem,
        addCartItem
    };
};
