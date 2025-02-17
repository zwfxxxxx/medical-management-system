"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomForm"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

// 导出FormFieldType枚举
export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phone_input",
    DATE_PICKER = "date_picker",
    SKELETON = "skeleton",
    SELECT = "select",
    CHECKBOX = "checkbox"
}

// 定义表单验证模式
const formSchema = z.object({
    phone: z.string().min(1, "手机号不能为空"),
    password: z.string().min(1, "密码不能为空"),
})

const LoginForm = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError('');
 
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    patient: {
                        phone: values.phone,
                        password: values.password
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.patientId, "patient");
                
                const redirectUrl = localStorage.getItem('redirectUrl');
                if (redirectUrl) {
                    localStorage.removeItem('redirectUrl');
                    router.push(redirectUrl);
                } else {
                    router.push('/');
                }
            } else {
                setError(data.message || '登录失败');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('登录失败，请重试');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="space-y-4">
                    <h1 className="text-blue-300 font-extrabold text-3xl">欢迎登录 [慧医系统]</h1>
                </section>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <CustomFormField
                    control={form.control}
                    name="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    fieldType={FormFieldType.INPUT}
                    iconSrc="/assets/icons/phone.svg"
                    iconAlt="phone"
                />

                <CustomFormField
                    control={form.control}
                    name="password"
                    label="密码"
                    placeholder="请输入密码"
                    fieldType={FormFieldType.INPUT}
                    iconSrc="/assets/icons/password.svg"
                    iconAlt="password"
                />

                <Button 
                    type="submit" 
                    className="shad-button_primary w-full h-10 bg-green-500 hover:bg-green-600 
                        text-base font-semibold rounded-lg transition-all duration-300 
                        flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                            登录中...
                        </>
                    ) : (
                        '登录'
                    )}
                </Button>
            </form>
        </Form>
    )
}
export default LoginForm
