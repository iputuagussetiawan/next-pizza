//http://localhost:3000/api/checkout/callback 

import { OrderSuccessTemplate } from "@/components/shared/email-templates/order-success";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json());
        const order=await prisma.order.findFirst({
            where:{
                id:Number(body.object.metadata.order_id)
            },
            include:{
                user:true,
            }
        })
        if(!order){
            return NextResponse.json('Order not found', { status: 404 })
        }
        const isSucceeded=body.object.status==="succeeded";
        await prisma.order.update({
            where:{
                id:order.id
            },
            data:{
                status:isSucceeded?OrderStatus.SUCCEEDED:OrderStatus.CANCELLED
            }
        })
        const items= JSON.parse(order?.items as string)  as CartItemDTO[];
        if(isSucceeded){
            await sendEmail(
                order.email,
                'Order Success',
                OrderSuccessTemplate({orderId:order.id,items})
            )
        }
        return NextResponse.json(body);
    } catch (error) {
        console.log(error)
        return NextResponse.json('Error', { status: 500 })
    }
}