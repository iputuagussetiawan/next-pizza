import { prisma } from "@/prisma/prisma-client"
import { Api } from "@/services/api-client"
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";
import { calcCartItemTotal } from "./calc-cart-item-total-price";

export const updateCartTotalAmount=async(token:string)=>{
    const userCart=await prisma.cart.findFirst({
        where:{
            token
        },
        include:{
            items:{
                orderBy:{
                    createdAt:'desc',
                },
                include:{
                    productItem:{
                        include:{
                            product:true,
                        },
                        
                    },
                    ingredients:true,
                }
            }
        }
    });

    if(!userCart){
        return 0
    }

    const totalAmount=userCart?.items.reduce((acc,item)=>{
        return acc + calcCartItemTotalAmount(item);
    },0)

    return await prisma.cart.update({
        where:{
            id:userCart.id
        },
        data:{
            totalAmount,
        }, 
        include:{
            items:{
                orderBy:{
                    createdAt:'desc'
                },
                include:{
                    productItem:{
                        include:{
                            product:true,
                        },
                    },
                    ingredients:true,
                }
            }
        }
    })
};