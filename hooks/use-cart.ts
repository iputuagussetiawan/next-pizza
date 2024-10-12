
import { CartStateItem, useCartStore } from '@/store/cart';
import React, { useCallback } from 'react';

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
};



export const useCart = (runFetch?: boolean): ReturnProps => {
    const [
        totalAmount,
        items,
        fetchCartItems,
        loading,
    ] = useCartStore((state) => [
        state.totalAmount,
        state.items,
        state.fetchCartItems,
        state.loading,
    ]);

    const fetchCart =useCallback( async () => {
        await fetchCartItems();
    },[]);

    React.useEffect(() => {
        if (runFetch) {
            fetchCart();
        }
    }, [runFetch, fetchCart]);

    return {
        totalAmount,
        items,
        loading,
    };
};
