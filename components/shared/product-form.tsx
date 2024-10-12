'use client'

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/store/cart";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props{
    product:ProductWithRelations;
    onSubmit?:VoidFunction;
}
export const ProductForm:React.FC<Props>=({product,onSubmit:_onSubmit})=>{
    //const [addCartItem,loading]=useCartStore((state)=>[state.addCartItem,state.loading]);
    const firstItem=product.items[0]
    const isPizzaForm=Boolean(firstItem.pizzaType) ;

    // const onSubmit=async(productItemId?:number, ingredientsIds?:number[])=>{
    //     try {
    //         const itemId=productItemId??firstItem.id   
    //         await addCartItem({productItemId:itemId,ingredientsIds});
    //         //toast.success('success');
    //_onSubmit?.()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };
    {
        return(
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
        )
    }
};