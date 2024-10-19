import { PayOrderTemplate } from '@/components/shared/email-templates/pay-order';
import React from 'react';
import { Resend } from 'resend';


export const sendEmail = async(to:string, subject:string, template:React.ReactNode) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'Next Pizza <agussetiawaniputu@gmail.com>',
        to: to,
        subject: subject,
        react: template,
    });
    
    if (error) {
        throw error
    }
    
    return data
    
}