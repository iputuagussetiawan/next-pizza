// import { mapPizzaType, PizzaSize, PizzaType } from "@/shared/constants/pizza";
// import { Ingredient } from "@prisma/client";

import React from "react";

interface Props {
  name: string;
  details:string;
  // pizzaSize?: PizzaSize;
  // type?: PizzaType;
  // ingredients?: Ingredient[];
}

export const CartItemInfo: React.FC<Props> = ({ name, details }) => {
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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>

      {
        details && 
        <p className="text-xs text-gray-400">{details}</p>
      }
      
    </div>
  );
};
