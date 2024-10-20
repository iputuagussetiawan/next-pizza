'use server'

import { PayOrderTemplate } from "@/components/shared/email-templates";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";


export async function createOrder(data: CheckoutFormValues){
    try {
        const cookieStore=cookies();
        const cartToken=cookieStore.get('cartToken')?.value;
        if(!cartToken){
            throw new Error('Cart token not found');
        }

        const userCart=await prisma.cart.findFirst({
            include:{
                user:true,
                items:{
                    include:{
                        ingredients:true,
                        productItem:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            },
            where:{
                token:cartToken
            }
        });
        if(!userCart){
            throw new Error('Cart not found');
        }

        if(userCart?.items.length===0){
            throw new Error('Cart is empty');
        }

        const order =await prisma.order.create({
            data:{
                //token:cartToken,
                totalAmount: 1500,
                status: OrderStatus.PENDING,
                items:JSON.stringify(userCart?.items),
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                userId: 1,
            }
        });
        await prisma.cart.update({
            where:{
                id:userCart.id
            },
            data:{
                totalAmount:0
            }
        })

        await prisma.cartItem.deleteMany({
            where:{
                cartId:userCart.id
            }
        })

    //TODO - Payment Gateway

    //end of payment gateway

    await prisma.order.update({
        where:{
            id:order.id
        },
        data:{
            paymentId:'123' //Get From Payment Gateway ID Transaction
        }
    })

    //const confirmUrl=paymentData.confirmation.confirmation_url; // get from payment gateway

    
    await sendEmail(data.email, 'Next Pizza - Order Confirmation #' +order.id, PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'https://google.com'  // change from payment gateway url
    }));

    //return confirmUrl;
    
    } catch (error) {
        console.log(error);
    }
}