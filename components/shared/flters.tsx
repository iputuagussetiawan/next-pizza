
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
                Testeeste
            </div>
        </div>
    );
};