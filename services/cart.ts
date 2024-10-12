import { axiosInstance } from './instance';
import { CartDTO, CartResponse } from './dto/cart.dto';
import { Cart } from '@prisma/client';


// type AddCartItemResponseDTO = { success: boolean; cart: Cart };

export const fetchCart = async (): Promise<CartDTO> => {
    return(await axiosInstance.get<CartDTO>('/cart')).data;
};

// export const addCartItem = async (values: CreateCartItemValues): Promise<CartResponse> => {
//     const { data } = await axiosInstance.post<CartResponse>('/cart', values);
//     return data;
// };

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, { quantity })).data
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return(await axiosInstance.delete<CartDTO>('/cart/' + id)).data
};
