import { Ingredient, ProductItem } from "@prisma/client";
import { calcTotalPizzaPrice } from "./calc-total-pizza-prices";
import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";

export const getPizzaDetails=(
    type:PizzaType, 
    size:PizzaSize, 
    items:ProductItem[], 
    ingredients:Ingredient[],
    selectedIngredients:Set<number>,
)=>{
    const totalPrice=calcTotalPizzaPrice(type,size, items,ingredients,selectedIngredients);
    const textDetails=`${size} cm, ${mapPizzaType[type]} Type,`;

    return {totalPrice, textDetails}
}