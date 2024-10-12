import { CartItemDTO } from '@/services/dto/cart.dto';

export const calcCartItemTotal = (item: CartItemDTO): number => {
    return (
        (item.productItem.price +
        item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) *
        item.quantity
    );
};
