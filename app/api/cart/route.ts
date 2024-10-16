import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amounts";
import { ingredients } from "@/prisma/seed";

export async function GET(req: NextRequest){
    try {
        const userId=1;
        const token=req.cookies.get('cartToken')?.value;
        //const token="11111"

        if(!token){
            return NextResponse.json({totalAmount:0, items:[]});
        }

        const userCart=await prisma.cart.findFirst({
            where:{
                OR:[
                    { userId },  // Explicitly defining the field and variable
                    {token,}
                ],
            },
            include:{
                items:{
                    orderBy:{
                        createdAt:'desc'
                    },
                    include:{
                        productItem:{
                            include:{
                                product:true
                            },
                        },
                        ingredients:true
                    }
                }
            }
        })
        return NextResponse.json(userCart); 
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        let cartToken = req.cookies.get('cartToken')?.value;

        const data = (await req.json()) as CreateCartItemValues;
    
        if (!cartToken) {
            cartToken = crypto.randomUUID();
        }
        let userCart = await findOrCreateCart(cartToken);
    
        const findCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
                ingredients: {
                    every:{
                        id:{
                            in:data.ingredients
                        }
                    }, 
                    some:{}
                },
                //ingredients: { some: { id: { in: data.ingredients } } },
                //...(data.ingredients?{ ingredients: { some: { id: { in: data.ingredients } } } }:{}),
            },
            include: {
                ingredients:true,
            }
        });
        if (findCartItem) {
            const updatedCartItem = await prisma.cartItem.update({
                where: {
                    id: findCartItem.id,
                },
                data: {
                    quantity: findCartItem.quantity + 1,
                },
            });
        }else{
            await prisma.cartItem.create({
                data: {
                    cartId: userCart!.id,
                    productItemId: data.productItemId,
                    quantity: 1,
                    ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
                },
            });
        }
    

        const updatedUserCart=await updateCartTotalAmount(cartToken)
        const resp = NextResponse.json(updatedUserCart);
        resp.cookies.set('cartToken', cartToken);
        return resp;
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_POST] Server error' }, { status: 500 });
    }
}