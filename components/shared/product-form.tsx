'use client'

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store/cart";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props{
    product:ProductWithRelations;
    onSubmit?:VoidFunction;
}
export const ProductForm:React.FC<Props>=({product,onSubmit:_onSubmit})=>{
    const router =useRouter();
    const firstItem=product.items[0]
    const isPizzaForm=Boolean(firstItem.pizzaType) ;
    const addCartItem=useCartStore(state=>state.addCartItem);
    const loading=useCartStore(state=>state.loading);
    

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
    {
        return(
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
        )
    }
};