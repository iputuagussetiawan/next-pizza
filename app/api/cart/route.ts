import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest){
    try {
        const userId=1;
        //const token=req.cookies.get('cartToken')?.value;
        const token="11111"

        if(!token){
            return NextResponse.json({totalAmount:0, items:[]});
        }

        const userCart=await prisma.cart.findFirst({
            where:{
                OR:[
                    // { userId: userId },  // Explicitly defining the field and variable
                    // { tokenId: String(token) }
                    // {
                    //     userId
                    // },
                    {
                        token,
                    }
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