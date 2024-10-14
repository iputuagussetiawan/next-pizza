
import { ChoosePizzaForm, ChooseProductForm, Container, ProductForm, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/group-variants';
import { prisma } from '@/prisma/prisma-client'
import { useCartStore } from '@/store/cart';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

export default async function ProductPage({params:{id}}:{params:{id:string}}) {
  const router =useRouter();
  const addCartItem=useCartStore(state=>state.addCartItem);
  const loading=useCartStore(state=>state.loading);

  
  
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
    const firstItem=product.items[0]
    const isPizzaForm=Boolean(firstItem.pizzaType) ;
    const onSubmit=async(productItemId?:number, ingredients?:number[])=>{
        try {
            const itemId=productItemId || firstItem.id
            await addCartItem({
                productItemId:itemId,
                ingredients,
            })
            toast.success(product.name+' Added To Cart')

            
            router.back()
            
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error)
        }
    }
    return (
      <Container className='flex flex-col my-10'>
        {
          isPizzaForm?(
              <ChoosePizzaForm 
                  imageUrl={product.imageUrl} 
                  name={product.name} 
                  ingredients={product.ingredients} 
                  items={product.items} 
                  onSubmit={onSubmit}
                  loading={loading}
              />
          ):(
              <ChooseProductForm 
                  imageUrl={product.imageUrl} 
                  name={product.name}
                  onSubmit={onSubmit} 
                  price={firstItem.price}
                  loading={loading}
              />
          )
      }
      </Container>
    )
}
