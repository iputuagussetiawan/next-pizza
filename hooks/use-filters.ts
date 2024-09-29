// import { useRouter, useSearchParams } from "next/navigation";
// import { useFilterIngredients } from "./use-filter-ingredients";
// import { useSet } from "react-use";
// import React from "react";

// interface PriceProps{
//     priceFrom?:number;
//     priceTo?:number;
// }

// interface QueryFilters extends PriceProps{
//     pizzaTypes:string;
//     sizes:string;
//     ingredients:string;
// }


// export const useFilters = () =>{
//     const router=useRouter();
//     const searchParams=useSearchParams() as unknown as Map<keyof QueryFilters, string>;

//     const {ingredients, loading, onAddId, selectedIngredients}=useFilterIngredients(
//         searchParams.get('ingredients')?.split(','),
//     );

//     const [sizes, {toggle:toggleSizes}]=useSet(
//         new Set<string>(searchParams.has('sizes')? searchParams.get('sizes')?.split(','):[])
//     );

//     const [pizzaTypes, {toggle:togglePizzaTypes}]=useSet(
//         new Set<string>(searchParams.has('pizzaTypes')? searchParams.get('pizzaTypes')?.split(','):[])
//     );

//     const [prices, setPrice] = React.useState<PriceProps>({
//         priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
//         priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined
//     });
// }