'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { useCartStore } from "@/store/cart";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { useStore } from "@/store/bear";
import { useCart } from "@/hooks/use-cart";

interface Props {
    className?: string;
}


export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    //const { items, totalAmount,loading } = useCart(true);

    const totalAmount=useCartStore(state => state.totalAmount);
    const items=useCartStore(state => state.items);
    const fetchCartItems = useCartStore(state => state.fetchCartItems);
    const updateItemQuantity=useCartStore(state => state.updateItemQuantity);
    const removeCartItem=useCartStore(state => state.removeCartItem);

    React.useEffect(() => {
        fetchCartItems();
    }, []);

    const onClickCountButton=(id: number, quantity: number, type: 'plus' | 'minus')=>{
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Your Cart :  <span className="font-bold">{items.length} items </span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                
                    {items && items.length > 0 ? (
                    items.map(item => (
                        <div key={item.id} className="mb-2">
                            <CartDrawerItem
                                
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={
                                    item.pizzaSize && item.pizzaType
                                    ? getCartItemDetails(
                                        item.ingredients,
                                        item.pizzaType as PizzaType,
                                        item.pizzaSize as PizzaSize
                                        )
                                    : ""
                                }
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onClickCountButton={(type)=>onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={()=>removeCartItem(item.id)}
                            />
                        </div>
                    ))
                    ) : (
                    <p>No items in the cart.</p>
                    )}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg text-neutral-500">
                            Total 
                            <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
                        </span>
                        <span  className="font-bold">{totalAmount}</span>
                    </div>
                    <Link href="/cart">
                    <Button type="submit" className="w-full h-12 text-base">
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