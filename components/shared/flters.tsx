
"use client"
import { useFilterIngredients } from "@/hooks/use-filter-ingredients";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";
import React, { use } from "react";
import { useSet } from "react-use";
import * as qs from 'qs'
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Props{
    className?:string;
}

interface PriceProps{
    priceFrom?:number;
    priceTo?:number;
}

interface QueryFilters extends PriceProps{
    pizzaTypes:string;
    sizes:string;
    ingredients:string;
}

export const Filters:React.FC<Props>=({className})=>{
    const searchParams=useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router=useRouter();


    const {ingredients, loading, onAddId, selectedIngredients}=useFilterIngredients(
        searchParams.get('ingredients')?.split(','),


    );

    const [sizes, {toggle:toggleSizes}]=useSet(
        new Set<string>(searchParams.has('sizes')? searchParams.get('sizes')?.split(','):[])
    );

    const [pizzaTypes, {toggle:togglePizzaTypes}]=useSet(
        new Set<string>(searchParams.has('pizzaTypes')? searchParams.get('pizzaTypes')?.split(','):[])
    );

    const [prices, setPrice] = React.useState<PriceProps>({
        priceFrom: searchParams.get('priceFrom') ? Number(searchParams.get('priceFrom')) : undefined,
        priceTo: searchParams.get('priceTo') ? Number(searchParams.get('priceTo')) : undefined
    });
    const items=ingredients.map((item)=>({value: item.id, text:item.name}));

    const updatePrice=(name:keyof PriceProps, value:number)=>{
        setPrice({
            ...prices,
            [name]:value,
        });
    }

    
    
    React.useEffect(()=>{
        const filters={
            ...prices,
            pizzaTypes:Array.from(pizzaTypes),
            sizes:Array.from(sizes),
            ingredients:Array.from(selectedIngredients)
    
        }

        const query=qs.stringify(filters,{
            arrayFormat:'comma'
        })

        router.push(`?${query}`,{
            scroll:false,
        });
    }, [prices,pizzaTypes,sizes, selectedIngredients, router])
    return(
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold"/>

            {/* <div className="flex flex-col gap-4">
                <FilterCheckbox name="type" text="Type" value="1"/>
                <FilterCheckbox name="test" text="Test-2" value="2"/>
            </div> */}

            <CheckboxFiltersGroup 
                title="Pizza Types"
                className="mb-5"
                name="Types"
                items={[
                    {text:'Type A', value:'1'},
                    {text:'Type B', value:'2'},
                ]}
                onClickCheckbox={togglePizzaTypes}
                selectedIds={pizzaTypes}
            />

            <CheckboxFiltersGroup 
                title="Sizes"
                className="mb-5"
                name="Sizes"
                limit={6}
                items={[
                    {text:'20 cm', value:'20'},
                    {text:'30 cm', value:'30'},
                    {text:'40 cm', value:'40'},
                ]}
                onClickCheckbox={toggleSizes}
                selectedIds={sizes}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        min={0} 
                        max={30000} 
                        value={String(prices.priceFrom)}
                        onChange={(e)=>updatePrice('priceFrom',Number(e.target.value))}
                    />
                    <Input 
                        type="number"  
                        min={100} 
                        max={30000} 
                        placeholder="1000" 
                        value={String(prices.priceTo)}
                        onChange={(e)=>updatePrice('priceTo',Number(e.target.value))}
                    />
                </div>
                <RangeSlider 
                    min={0} 
                    max={5000} 
                    step={10} 
                    value={[prices.priceFrom ?? 0, prices.priceTo ?? 1000]} 
                    onValueChange={([priceFrom,priceTo])=>setPrice({priceFrom:priceFrom, priceTo:priceTo})}
                />
            </div>
            <CheckboxFiltersGroup 
                title="Ingredients:"
                className="mt-5"
                name="ingredients"
                limit={6}
                defaultItems={items.slice(0,6)}

                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selectedIds={selectedIngredients}
            />
        </div>
    );
};