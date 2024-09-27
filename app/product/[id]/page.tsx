import React from 'react'

export default function ProductPage({params:{id}}:{params:{id:string}}) {
  return (
    <h1>Product {id}</h1>
  )
}
