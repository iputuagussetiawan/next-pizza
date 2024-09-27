
"use client"
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";

interface Props{
    className?:string;
}

export const Filters:React.FC<Props>=({className})=>{
    const {ingredients, loading, onAddId, selectedIds}=useFilterIngredients();
    const items=ingredients.map((item)=>({value:item.id, text:item.name}));
    return(
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold"/>

            <div className="flex flex-col gap-4">
                <FilterCheckbox name="type" text="Type" value="1"/>
                <FilterCheckbox name="test" text="Test-2" value="2"/>
            </div>

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={30000} defaultValue={0}/>
                    <Input type="number"  min={100} max={30000} placeholder="1000"/>
                </div>
                <RangeSlider min={100} max={5000} step={10} value={[0,5000]} />
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
                selectedIds={selectedIds}
            />
        </div>
    );
};