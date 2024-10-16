// import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
// import { Ingredient } from "@prisma/client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  name: string;
  details:string;
  className?: string;
  // pizzaSize?: PizzaSize;
  // type?: PizzaType;
  // ingredients?: Ingredient[];
}

export const CartItemInfo: React.FC<Props> = ({ name, details,className }) => {
  // const details = [];

  // if (pizzaSize && type) {
  //   const typeName = mapPizzaType[type];
  //   details.push(`${typeName} ${pizzaSize} см`);
  // }

  // if (ingredients) {
  //   details.push(...ingredients.map((ingredient) => ingredient.name));
  // }

  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>

      {
        details && 
        <p className="text-xs text-gray-400 w-[90%]">{details}</p>
      }
      
    </div>
  );
};
