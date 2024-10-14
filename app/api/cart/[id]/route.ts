import { calcCartItemTotalAmount } from '@/lib/calc-cart-item-total-amount';
import { getUserSession } from '@/lib/get-user-session';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amounts';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id=Number(params.id);
        const data=(await req.json()) as {quantity:number};
        const cartToken = req.cookies.get('cartToken')?.value;
        

        if (!cartToken) {
            return NextResponse.json({ error: 'Cart token not found' });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }

        await prisma.cartItem.update({
            where: {
                id
            },
            data: {
                quantity: data.quantity,
            },
        });


        const updatedUserCart=await updateCartTotalAmount(cartToken)
        return NextResponse.json(updatedUserCart);


    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_PATCH] Server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id=Number(params.id)
        const cartToken = req.cookies.get('cartToken')?.value;
        // const currentUser = await getUserSession();
        // const userId = Number(currentUser?.id);

        if (!cartToken) {
            return NextResponse.json({ error: 'Cart token not found' });
        }
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: Number(params.id),
            },
        });
        if (!cartItem) {
            return NextResponse.json({ error: 'Cart item not found' });
        }
        await prisma.cartItem.delete({
            where: {
                id: id,
            },
        });
        await updateCartTotalAmount(cartToken);
    
        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    {
                        token: cartToken,
                    },
                ],
            },
            include: {
                items: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    include: {
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                        ingredients: true,
                    },
                },
            },
        });
    return NextResponse.json(userCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
    }
}

