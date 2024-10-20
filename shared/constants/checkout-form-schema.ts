import {z} from 'zod'

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, {message: 'Too short'}).max(50, {message: 'Too long'}),
    lastName: z.string().min(2, {message: 'Too short'}).max(50, {message: 'Too long'}),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, {message: 'Too short'}).max(20, {message: 'Too long'}),
    address: z.string().min(5, {message: 'Too short'}).max(100, {message: 'Too long'}),
    comment: z.string()
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>