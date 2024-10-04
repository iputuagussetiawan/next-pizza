
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { cn } from "@/lib/utils";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm:React.FC<Props>=({
name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
})=>{
    const textDetails='Lorem Ipsum ';
    const totalPrice=350;
    const size=30;
    return(
      
    <div className={cn(className,'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
         
        </div>

        <Button
          // loading={loading}
          // onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Add to cart for ${totalPrice}
        </Button>
      </div>
    </div>
    );
};