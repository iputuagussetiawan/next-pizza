'use client'
import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../required-symbol";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { set } from "js-cookie";
import { Textarea } from "@/components/ui/textarea";
import React from "react";


interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    name:string;
    label:string;
    required?:boolean;
    className?:string;
}
export const FormTextarea:React.FC<Props>=({name,label,required,className, ...props})=>{
    const {
        register,
        formState:{errors},
        watch,
        setValue
    }=useFormContext();

    const value=watch(name);
    const errorText=errors[name]?.message as string;

    const onClickClear=()=>{
        setValue(name,'',{shouldValidate:true});
    }
    return(
        <div className={className}>
            {label &&(
                <p className="font-medium mb-2">
                    {label} {required&&<RequiredSymbol/>}
                </p>
            )}

            <div className="relative">
                
                <Textarea className="h-12 text-md" {...register(name)} {...props}/>  
                {value && <ClearButton onClick={onClickClear}/>} 
            </div>

            {errorText && <ErrorText text={errorText}/>}
        </div>
    )
}
