
import { Container, ProductForm} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client'
import { useCartStore } from '@/store/cart';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

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
