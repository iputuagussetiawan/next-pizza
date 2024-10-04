export const mapPizzaSize={
    20:"Pizza Small",
    30:"Pizza Medium",
    40:"Pizza Large",
} as const;

export const mapPizzaType={
    1:"Can be collected",
    2:"New items",
} as const;

export const pizzaSizes=Object.entries(mapPizzaSize).map(([value,name])=>({
    name,
    value,
}))

export const pizzaTypes=Object.entries(mapPizzaType).map(([value,name])=>({
    name,
    value,
}))

export type PizzaSize= keyof typeof mapPizzaSize;
export type PizzaType= keyof typeof mapPizzaType;