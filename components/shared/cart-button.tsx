'use client'
import React from "react";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./cart-drawer";
import { useCartStore } from "@/store/cart";
interface Props{
    className?:string;
}
export const CartButton:React.FC<Props>=({className})=>{
    const totalAmount=useCartStore(state => state.totalAmount);
    const loading=useCartStore(state => state.loading);
    const items=useCartStore(state => state.items);
    return(
        <CartDrawer>
            <Button loading={loading} className={cn("group relative",{'w-[150px]':loading}, className)}>
                <b>${totalAmount}</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"/>
                <div className="flex item-center gap-1 transition duration-500 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                    <b>{items.length}</b>
                    </div>
                <ArrowRight size={16} className="absolute right-5 transition duration-500 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 "/>
            </Button>
        </CartDrawer>
    );
};