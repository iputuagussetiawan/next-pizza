import { create } from 'zustand';
import { Api } from "@/services/api-client";
import { getCartDetails } from '@/lib';
import { CreateCartItemValues } from '@/services/dto/cart.dto';

export type ICartItem = {
    disabled: boolean | undefined;
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    type?: number | null;
    ingredients: Array<{ name: string; price: number }>;
  };
  

export type CartStateItem = {
    disabled: boolean | undefined;
    pizzaType?: number | null | undefined;
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    type?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    addCartItem: (values: any) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.fetchCart();
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set(state=>({
                loading:true,
                error:false,
                items:state.items.map(item=>item.id===id?{...item,disable:true}:item)
            }));
            const data = await Api.cart.removeCartItem(id);
            set(getCartDetails(data));
        } catch (error) {
            set({ error: true });
            console.error(error);
        } finally {
            set(state=>({
                loading:false,
                items:state.items.map(item=>({...item,disable:false})),
            }));
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set(getCartDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));