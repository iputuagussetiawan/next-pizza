// import { CartResponse } from '@/services/dto/cart';
import {CartDTO } from '@/services/dto/cart.dto';
import { calcCartItemTotal } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
};

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotal(item),
        pizzaSize: item.productItem.price,
        pizzaType: item.productItem.pizzaType,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    }));
    return { 
        items, 
        totalAmount: data.totalAmount || 0 
    };
};
