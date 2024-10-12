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
    

    const bears = useStore((state) => state.bears)

    const increasePopulation = useStore((state) => state.increasePopulation)
  // Destructuring state and actions from useCartStore
    // const [totalAmount ] = useCartStore(state => [
    //     state.totalAmount,
    //     state.fetchCartItems,
    //     state.items
    // ]);

    // console.log(items)

  // Fetch cart items on component mount
    // React.useEffect(() => {
    //     fetchCartItems(); // Ensure this function properly updates cart state
    // }, []);

    // const onClickCountButton=(id:number,quantity:number, type:'plus' | 'minus')=>{
    //     const newQuantity=type==='plus'?quantity+1 : quantity-1;
    //     updateItemQuantity(id,newQuantity);
    // }

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                <SheetTitle>
                    Test Sidebar <span className="font-bold">Tests</span>
                </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                <div className="mb-2">
                    {/* {items && items.length > 0 ? (
                    items.map(item => (
                        <CartDrawerItem
                        key={item.id}
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
                    ))
                    ) : (
                    <p>No items in the cart.</p>
                    )} */}


                    <CartDrawerItem
                        key={1}
                        id={1}
                        imageUrl={''}
                        details={''}
                        name={'Test 1'}
                        price={500}
                        quantity={1}
                        onClickCountButton={(type)=>onClickCountButton(1, 1, type)}
                        // onClickRemove={}
                        />
                </div>
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                    <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                        Total
                        <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></span>
                    </span>
                    <span className="font-bold text-lg">${bears}</span>
                    </div>

                    <button onClick={increasePopulation}>one up</button>

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