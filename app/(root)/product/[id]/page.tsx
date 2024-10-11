
import { ChoosePizzaForm, ChooseProductForm, Container, ProductImage, Title } from '@/components/shared';
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
        
        {
          
            isPizzaForm?(
                <ChoosePizzaForm 
                  imageUrl={product.imageUrl} 
                  name={product.name} 
                  ingredients={product.ingredients} 
                  items={product.items} 
                />
            ):(
                <ChooseProductForm 
                  imageUrl={product.imageUrl} 
                  name={product.name}
                />
            )
        }
        {/* <div className='flex flex-1'>
            <ProductImage imageUrl={product.imageUrl} size={40}/>
            <div className='w-[490px] bg-[#FCFCFC] p-7'>
              <Title text={product.name} size="md" className='font-extrabold mb-1'></Title>
              <p className='text-gray-400'> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi eos exercitationem dicta inventore optio mollitia corrupti quo magnam iusto. Quos aliquid quidem temporibus id laboriosam quis pariatur officia nostrum velit?</p>
              
            </div>
        </div> */}
      </Container>
    )
}
