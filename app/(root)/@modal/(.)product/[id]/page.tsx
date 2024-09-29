import { Container, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/group-variants';
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function ProductModalPage({params:{id}}:{params:{id:string}}) {
    return <h1>123434</h1>
}
