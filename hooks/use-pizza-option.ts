import { Variant } from "@/components/shared/group-variants";
import { getAvailablePizzaSizes } from "@/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { ProductItem } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps{
    size:PizzaSize;
    type:PizzaType;
    selectedIngredients:Set<number>;
    availableSizes:Variant[];
    setSize:(size:PizzaSize)=>void;
    setType:(type:PizzaType)=>void;
    addIngredient:(id:number)=>void;
}

export const usePizzaOptions=(items:ProductItem[]):ReturnProps=>{
    const [size, setSize]=React.useState<PizzaSize>(20);
    const [type, setType]=React.useState<PizzaType>(1)
    const[selectedIngredients,{toggle:addIngredient}]=useSet(new Set<number>([]))

    const availableSizes=getAvailablePizzaSizes(type, items);

    React.useEffect(()=>{
        const isAvailableSize=availableSizes?.find((item)=> Number(item.value)===size && !item.disabled);
        const availableSize=availableSizes?.find((item)=>!item.disabled);
        if(!isAvailableSize && availableSize){
            setSize(Number(availableSize.value)as PizzaSize);
        }
    }, [type])

    return{
        size,
        type,
        selectedIngredients,
        availableSizes,
        setSize,
        setType,
        addIngredient
    }
}