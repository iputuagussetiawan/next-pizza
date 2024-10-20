import React from 'react';

interface Props {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({orderId,totalAmount,paymentUrl}) => (
    <div>
        <h1>Your Order ID : #{orderId}</h1>
        <p>Total Amount : ${totalAmount}</p>
        <p>Payment Url : <a href={paymentUrl}>Payment Url</a></p>
    </div>
);