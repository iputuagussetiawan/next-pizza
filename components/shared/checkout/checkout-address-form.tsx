'use client'
import { Input, Textarea } from "@/components/ui";
import { WhiteBlock } from "../white-block";
import { Controller, useFormContext, } from "react-hook-form";
import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";
import { ErrorText } from "../error-text";

interface Props{
    className?:string;
}
export const CheckoutAddressForm:React.FC<Props>=({className})=>{
    const {control}=useFormContext()
    return(
        <WhiteBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                {/* <Input name="address" className="text-base" placeholder="Enter address"/> */}
                <Controller
                    control={control}
                    name="address"
                    render={({field, fieldState})=>(  
                        <>
                            <AddressInput onChange={field.onChange}/>
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
                        </>       
                    )}
                />
                <FormTextarea name="comment"
                className="text-base"
                rows={5}
                placeholder="Please provide additional information for the courier here." label={"Comment"}                />
            </div>
        </WhiteBlock>
    );
};