'use client'
import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
interface Props{
  hasSearch?:boolean;
  hasCart?:boolean;
  className?:string;
}

export const Header: React.FC<Props>=({className,hasSearch=true, hasCart=true})=>{
  const searchParams=useSearchParams();
  React.useEffect(()=>{
    if(searchParams.has('paid')){
      setTimeout(()=>{   
        toast.success('Payment Successful');
      },500)
    }
  },[]); 
  return(
    <header className={cn('border-b',className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={32}/>
            <div>
              <h1 className="text-2xl uppercase font-black">
                Next Pizza
              </h1>
              <p className="text-sm text-gray-400 leading-3">
                Best Pizza For You
              </p>
            </div>
          </div>
        </Link>

        {hasSearch &&
          <div className="mx-10 flex-1">
            <SearchInput/>
          </div>
        }
        
        <div className="flex item-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User size={16} />
            Button
          </Button>
          {hasSearch && 
          <div>
            <CartButton/>
          </div>
          }
        </div>
      </Container>
    </header>
  )
}