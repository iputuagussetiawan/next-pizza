import { CartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

interface Props {
    orderId: number;
    items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({orderId,items}) => (
    <div>
        <h1>Your Order Success</h1>
        <p>Your Order #{orderId} Was Successful</p>

        <hr/>
        <ul>
            {
                items.map((item)=>(
                    <li key={item.id}>
                        {item.productItem.product.name} | ${item.productItem.price} | {item.quantity}= {" "} ${item.productItem.price * item.quantity}
                    </li>
                ))
            }
        </ul>
    </div>
);