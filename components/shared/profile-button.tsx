import { signIn, useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui";
import { CircleUser, CircleUserIcon, User } from "lucide-react";
import { on } from "events";
import Link from "next/link";

interface Props{
    onClickSignIn?:() => void;
    className?:string;
}
export const ProfileButton:React.FC<Props>=({className,onClickSignIn})=>{
    const {data:session} = useSession();
    console.log(session)
    return(
        <div className={className}>
            {
                !session?  <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
                    <User size={16} />
                    Login
                </Button>:
                <Link href="/profile">
                    <Button variant="secondary" className="flex items-center gap-1">
                        <CircleUserIcon size={18}/>
                        {session?.user?.name}
                    </Button>
                </Link>
            }
        </div>
    );
};