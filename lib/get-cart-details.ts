// import { CartResponse } from '@/services/dto/cart';
import {CartDTO } from '@/services/dto/cart.dto';
import { calcCartItemTotal } from './calc-cart-item-total-price';

export type CartStateItem = {
    disabled: boolean | undefined;
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disable?:boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item:any) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        disabled:false,
        price: calcCartItemTotal(item),
        pizzaSize: item.productItem.price,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient: { name: any; price: any; }) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    })) as CartStateItem[];
    return { 
        items, 
        totalAmount: data.totalAmount || 0 
    };
};
