'use client'
import { CheckoutItem, CheckoutSidebar, Container, Title, WhiteBlock } from "@/components/shared";
import { Input, Textarea } from "@/components/ui";
import { useCart } from "@/hooks";
import { getCartItemDetails } from "@/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";

export default function CheckoutPage() {
    const { totalAmount, updateItemQuantity, items ,removeCartItem } = useCart(true);
    const onClickCountButton=(id: number, quantity: number, type: 'plus' | 'minus')=>{
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }


    return <Container className="mt-10">
        <Title text="Placing an order" className="font-extrabold mb-8 text-[36px]"></Title>
        <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
                <WhiteBlock title="1. Basket">
                    <div className="flex flex-col gap-5">
                        {
                            items.map((item)=>(
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

                <WhiteBlock title="2. Personal information">
                    <div className="grid grid-cols-2 gap-5">
                        <Input name="firstName" className="text-base" placeholder="First Name"/>
                        <Input name="lastName" className="text-base" placeholder="Last Name"/>
                        <Input name="email" className="text-base" placeholder="Email"/>
                        <Input name="phone" className="text-base" placeholder="Phone"/>
                    </div>
                </WhiteBlock>

                <WhiteBlock title="3. Delivery address">
                    <div className="flex flex-col gap-5">
                        <Input name="address" className="text-base" placeholder="Enter address"/>
                        <Textarea
                            className="text-base"
                            rows={5}
                            placeholder="Please provide additional information for the courier here."
                        />
                    </div>
                </WhiteBlock>
            </div>
            <div className="w-[450px]">
                <CheckoutSidebar totalAmount={totalAmount}/>
            </div>
        </div>
    </Container>;
}