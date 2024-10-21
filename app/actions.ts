'use server'

import { PayOrderTemplate, VerificationUserTemplate } from "@/components/shared/email-templates";
import { sendEmail } from "@/lib";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
            email: body.email,
            },
        });
        if (user) {
            if (!user.verified) {
                throw new Error('Email not confirmed');
            }

            throw new Error('User already exists');
        }
        const createdUser = await prisma.user.create({
            data: {
            ...body,
            password: hashSync(body.password, 10),
            },
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000),
            },
        });
        console.log(createdUser);
        // const html = `
        //     <p>Verification code: <h2>${code}</h2></p>
        //     <p><a href="http://localhost:3000/api/auth/verify?code=${code}">Confirm registration</a></p>
        // `;
        await sendEmail(createdUser.email, 'Next Pizza / Registration confirmation', VerificationUserTemplate({code}));
    } catch (error) {
        console.log('Error [CREATE_USER]', error);
        throw error;
    }
}


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

export async function updateUserInfo(body: Prisma.UserCreateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('User not found');
        }

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                ...body,
                password: hashSync(body.password, 10),
            },
        });
    } catch (error) {
        console.log('Error [UPDATE_USER]', error);
        throw error;
    }
}