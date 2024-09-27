import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const search = async(query:string): Promise<Product[]>=>{
    // const {data}=await axiosInstance.get<Product>('/products/search',{params:{query}});
    // return data;

    return(await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS,{params:{query}})).data
}