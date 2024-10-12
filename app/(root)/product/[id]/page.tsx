
import { ChoosePizzaForm, ChooseProductForm, Container, ProductForm, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/group-variants';
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function ProductPage({params:{id}}:{params:{id:string}}) {
  
  const product=await prisma.product.findFirst({
    where:{id:Number(id)}, 
    include:{
      ingredients:true,
      category:{
        include:{
          products:{
            include:{
              items:true,
            },
          },
        },
      },
      items:{
        orderBy:{
          createdAt:'desc',
        }
      },
    }
  });
    if(!product){
      return notFound();
    }
    const isPizzaForm=Boolean(product.items[0].pizzaType) ;
    return (
      <Container className='flex flex-col my-10'>
        <ProductForm product={product} />
      </Container>
    )
}
