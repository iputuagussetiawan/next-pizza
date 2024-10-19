'use client'
import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props{
    onChange?: (value?: string) => void
}

export const AddressInput:React.FC<Props> = ({onChange}) => {
    return (
        <AddressSuggestions 
            token="f88e37945a37fe9086a6d18c3a6184b63f985312" 
            onChange={(data)=>onChange?.(data?.value)} 
        />
    )
}