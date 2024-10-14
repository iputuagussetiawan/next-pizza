
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
    imageUrl: string;
    name: string;
    onSubmit?:VoidFunction;
    price:number;
    className?: string;
    loading?:boolean;
}

export const ChooseProductForm:React.FC<Props>=({name,imageUrl,onSubmit,price,className,loading})=>{
  
  return(
    <div className={cn(className,'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[300px] h-[300px]"
        />
      </div>
      <div className="w-[490px] bg-[#FCFCFC] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          // onClick={handleClickAdd}
          onClick={()=>onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5">
            Buy {price} ₽
        </Button>
      </div>
    </div>
    );
};