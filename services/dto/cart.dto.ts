import { Cart, CartItem, Ingredient, Product, ProductItem } from '@prisma/client';

export type CartItemDTO = CartItem & {
    productItem: ProductItem & { product: Product; ingredients: Ingredient[]};
    ingredients: Ingredient[];
};

export type CartDTO =  Cart & {
    items:CartItemDTO[];
}



export type CartResponse = Cart & {
    items: CartItemDTO[];
};

export interface CreateCartItemValues {
    productItemId: number;
    pizzaSize?: number;
    pizzaType?: number;
    ingredients?: number[];
    quantity: number;
}
