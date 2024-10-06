import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Function To Calculation Total Pizza Price
 * 
 * @example ```calcTotalPizzaPrice(type,size,items,ingredients,selectedIngredients)```
 * 
 * @param type 
 * @param size 
 * @param items 
 * @param ingredients 
 * @param selectedIngredients 
 * @returns number total price
 */

export const calcTotalPizzaPrice=(
    type:PizzaType, 
    size:PizzaSize, 
    items:ProductItem[], 
    ingredients:Ingredient[],
    selectedIngredients:Set<number>,
)=>{
    /* 
        Find the price of the pizza by searching through the 'items' array
        The condition matches both the 'pizzaType' and 'size' with the provided 'type' and 'size'
        If no matching pizza is found, the price defaults to 0 
    */
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    /* 
        Filter the 'ingredients' array to include only the selected ingredients
        The condition checks if the 'ingredient.id' exists in the 'selectedIngredients' set
        Then sum the prices of the filtered ingredients using reduce 
    */
    const totalIngredientPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))  // Filter only selected ingredients
    .reduce((acc, ingredient) => acc + ingredient.price, 0);  // Sum the prices of the selected ingredients

    // Calculate the total price by adding the pizza price and the total ingredient price
    const totalPrice = pizzaPrice + totalIngredientPrice;
    return totalPrice
}