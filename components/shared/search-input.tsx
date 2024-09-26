'use client';

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";
import { useClickAway } from "react-use";

interface Props{
    className?:string;
}
export const SearchInput:React.FC<Props>=({className})=>{
    const [focused, setFocused]=React.useState(false);
    const ref = React.useRef(null);
    useClickAway(ref,()=>{
        //console.log('OUTSIDE CLICED')
        setFocused(false);
    })
    return(
        <>    
            {focused && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30">
                    {/* You can add any additional elements here, e.g., a close button */}
                </div>
            )}

            <div
                ref={ref}
                className={cn("relative h-11 flex rounded-2xl flex-1 justify-between z-30", className)}>
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"/>
                <input
                    className="rounded-2xl outline-none w-full bg-gray-50 pl-11" 
                    type="text" 
                    placeholder="Search..." 
                    onFocus={()=>setFocused(true)}
                />

                <div className={cn("absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30", focused && 'visible opacity-100 top-12')}>
                    <h1>Testes</h1>
                </div>
            </div>
        </>
    );
};