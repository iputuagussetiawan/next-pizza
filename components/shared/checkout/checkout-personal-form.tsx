import React, { use } from "react";
import { Input } from "@/components/ui";
import { FormInput } from "../form";
import { WhiteBlock } from "../white-block";

interface Props{
    className?:string;
}
export const CheckoutPersonalForm:React.FC<Props>=({className})=>{
 
    return(
    <WhiteBlock title="2. Personal information" className={className}>
        <div className="grid grid-cols-2 gap-5">
            <FormInput name="firstName" className="text-base" placeholder="First Name" label="First Name"/>
            <FormInput name="lastName" className="text-base" placeholder="Last Name" label="Last Name"/>
            <FormInput name="email" className="text-base" placeholder="Email" label="Email"/>
            <FormInput name="phone" className="text-base" placeholder="Phone" label={"Phone"}/>
        </div>
    </WhiteBlock>
    );
};