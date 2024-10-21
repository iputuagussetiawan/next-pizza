import React from 'react';
import { Title } from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { TFormLoginData, formLoginSchema } from './schemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { FormInput } from '@/components/shared/form';
import { signIn } from 'next-auth/react';

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginData>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: TFormLoginData) => {
        try {
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!resp?.ok) {
                return toast.error('Invalid email or password', {
                    icon: '❌',
                });
            }

            onClose?.();
        } catch (error) {
            console.log('Error [LOGIN]', error);
            toast.error('Failed to login', {
                icon: '❌',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-end">
                    <div className="mr-2">
                        <Title text="Login" size="md" className="font-bold" />
                        <p className="text-gray-400">Enter your email to log into your account</p>
                    </div>
                    {/* <img src="/assets/images/phone-icon.png" alt="phone-icon" width={40} height={40} /> */}
                </div>

                <FormInput name="email" label="E-Mail" required />
                <FormInput type="password" name="password" label="Password" required />

                <Button disabled={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    {form.formState.isSubmitting ? 'Login...' : 'Login'}
                </Button>
            </form>
        </FormProvider>
    );
};
