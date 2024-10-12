
"use client"

import React from "react";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { Title } from "./title";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";

interface Props{
    className?:string;
}

export const Filters:React.FC<Props>=({className})=>{
    const {ingredients, loading}=useIngredients();
    const filters=useFilters();
    useQueryFilters(filters)
    const items=ingredients.map((item)=>({value: String(item.id), text:item.name}));

    const updatePrices=(prices:number[])=>{
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }
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
                onClickCheckbox={filters.setPizzaTypes}
                selectedIds={filters.pizzaTypes}
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
                onClickCheckbox={filters.setSizes}
                selectedIds={filters.sizes}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        min={0} 
                        max={30000} 
                        value={String(filters.prices.priceFrom)}
                        onChange={(e)=>filters.setPrices('priceFrom',Number(e.target.value))}
                    />
                    <Input 
                        type="number"  
                        min={100} 
                        max={30000} 
                        placeholder="1000" 
                        value={String(filters.prices.priceTo)}
                        onChange={(e)=>filters.setPrices('priceTo',Number(e.target.value))}
                    />
                </div>
                <RangeSlider 
                    min={0} 
                    max={5000} 
                    step={10} 
                    value={[filters.prices.priceFrom ?? 0, filters.prices.priceTo ?? 1000]} 
                    onValueChange={updatePrices}
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
                onClickCheckbox={filters.setSelectedIngredients}
                selectedIds={filters.selectedIngredients}
            />
        </div>
    );
};