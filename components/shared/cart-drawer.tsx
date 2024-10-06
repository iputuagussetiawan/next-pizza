'use client'
import React, { Children } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, ArrowRightCircleIcon } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";

interface Props{
    className?:string;
}
export const CartDrawer:React.FC<React.PropsWithChildren<Props>>=({children,className})=>{
    return(
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Test Sidebar <span className="font-bold">3 Item</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto flex-1">
                    <CartDrawerItem 
                        id={1}
                        imageUrl={'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp'}
                        details={getCartItemDetails(2,30,[])}
                        name="Testese"
                        price={500}
                        quantity={1}
                    />

                </div>

                

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Total
                                <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
                            </span>
                            <span className="font-bold text-lg">$500</span>
                        </div>

                        <Link href="/cart">
                            <Button
                                //onClick={()=>setRedirecting(true)}
                                //loading={loading || redirecting}
                                type="submit"
                                className="w-full h-12 text-base"
                            >
                                Go To Cart
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};