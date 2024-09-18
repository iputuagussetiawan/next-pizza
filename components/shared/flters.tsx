
import { Input } from "../ui/input";
import { RangeSlider } from "../ui/range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";

interface Props{
    className?:string;
}

export const Filters:React.FC<Props>=({className})=>{
    return(
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold"/>

            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Test" value="1"/>
                <FilterCheckbox text="Test-2" value="2"/>
            </div>

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input type="number" placeholder="0" min={0} max={30000} defaultValue={0}/>
                    <Input type="number"  min={100} max={30000} placeholder="1000"/>
                </div>
                <RangeSlider min={100} max={500} step={10} value={[0,5000]} />
            </div>
            <CheckboxFiltersGroup 
                title="Ingredients:"
                className="mt-5"
                limit={3}
                defaultItems={[
                    {
                        text:'Cheese sauce',
                        value:'1'
                    },
                    {
                        text:'Mozzarella',
                        value:'2'
                    },
                    {
                        text:'Garlic',
                        value:'3'
                    },
                ]}

                items={[
                    {
                        text:'Cheese sauce',
                        value:'1'
                    },
                    {
                        text:'Mozzarella',
                        value:'2'
                    },
                    {
                        text:'Garlic',
                        value:'3'
                    },
                    {
                        text:'Pickled cucumbers',
                        value:'4'
                    },
                    {
                        text:'Red onion',
                        value:'5'
                    },
                    {
                        text:'Tomatoes',
                        value:'6'
                    },

                    
                ]}
            />
        </div>
    );
};