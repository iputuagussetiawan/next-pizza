import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { removeCartItem } from "@/services/cart";
import { getCartItemDetails } from "@/lib";
import { CartStateItem } from "@/lib/get-cart-details";
import { Skeleton } from "@/components/ui";
import { Check } from "lucide-react";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props{
    items:CartStateItem[];
    onClickCountButton:(id: number, quantity: number, type: 'plus' | 'minus')=>void;
    removeCartItem:(id: number)=>void;
    className?:string;
    loading?:boolean;
}
export const CheckoutCart:React.FC<Props>=({items,onClickCountButton,removeCartItem, className,loading})=>{
    return(
        <WhiteBlock title="1. Basket" className={className}>
        <div className="flex flex-col gap-5">
            {loading 
            ?[...Array(4)].map((_,index)=><CheckoutItemSkeleton key={index}/>)
            : items.map((item)=>(
                    <CheckoutItem 
                        key={item.id}
                        id={item.id} 
                        imageUrl={item.imageUrl} 
                        details={
                            getCartItemDetails(
                                item.ingredients,
                                item.pizzaType as PizzaType,        
                                item.pizzaSize as PizzaSize,
                            )
                        }
                        disabled={item.disabled}
                        name={item.name} 
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={(type)=>onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={()=>removeCartItem(item.id)}
                    />
                ))
            }
            
        </div>
    </WhiteBlock>
    );
};
