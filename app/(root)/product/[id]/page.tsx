
import { Container, ProductForm} from '@/components/shared';
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
    return (
      <Container className='flex flex-col my-10'>
        <ProductForm product={product} />
      </Container>
    )
}
