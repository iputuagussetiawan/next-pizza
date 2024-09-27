'use client';

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useClickAway, useDebounce } from "react-use";

interface Props{
    className?:string;
}
export const SearchInput:React.FC<Props>=({className})=>{
    const [searchQuery, setSearchQuery]=React.useState('');
    const [focused, setFocused]=React.useState(false);
    const [products, setProducts]=React.useState<Product[]>([]);
    const ref = React.useRef(null);
    useClickAway(ref,()=>{
        //console.log('OUTSIDE CLICED')
        setFocused(false);
    })

    useDebounce(
        async()=>{
            try {
                const response= await Api.products.search(searchQuery);
                setProducts(response);
            } catch (error) {
                console.log(error)
            }
        },
    700,
    [searchQuery]);


    const onClickItem=()=>{
        setFocused(false);
        setSearchQuery('');
        // setProducts([]);
    }
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
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                />
                {
                    products.length > 0 && (
                        <div 
                            className={cn("absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30", 
                            focused && 'visible opacity-100 top-12')}
                        >
        
                            {
                                products.map(product=>(
                                    <Link key={product.id}
                                        onClick={onClickItem}
                                        className="flex items-center px-3 py-2 hover:bg-primary/10 gap-3" 
                                        href={`/product/${product.id}`}>
                                            <img className="rounded-sm h-8 w-8"  src={product.imageUrl} alt={product.name} width={32} height={32} />
                                            <span className="">
                                                {product.name}
                                            </span>
                                    </Link>
                                ))
                            }
                            
                        </div>
                    )
                }
               
            </div>
        </>
    );
};