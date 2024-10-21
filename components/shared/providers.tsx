'use client'
import { Component } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

export const Providers:React.FC<React.PropsWithChildren>=({children})=>{
    return(
        <>
            <SessionProvider>
                {children}
            </SessionProvider>
            <Toaster/>
            <NextTopLoader/>
        </>
    );
};
