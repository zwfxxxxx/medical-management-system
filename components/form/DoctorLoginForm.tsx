"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./LoginForm"
import { doctorLogin } from "@/lib/action/doctor"
import { useAuth } from "@/contexts/AuthContext"

const LoginForm = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            phone: "",
            password: ""
        },
    })

    async function onSubmit({phone, password}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)
        setError('')
        
        try {
            const doctor = {phone, password}
            const data = await doctorLogin(doctor);
            
            if (data.success) {
                login(data.token, data.doctorId, 'doctor');
                router.push(`/doctor/${data.doctorId}/dashboard`);
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
                    <h1 className="text-blue-300 font-extrabold text-3xl">医生登录</h1>
                </section>

                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="phone"
                    label="账号"
                    placeholder="电话或邮箱"
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="密码"
                    placeholder="密码"
                    iconSrc='/assets/icons/email.svg'
                    iconAlt='email'
                />

                <SubmitButton isLoading={isLoading}>
                    {isLoading ? '登录中...' : '登录'}
                </SubmitButton>
            </form>
        </Form>
    )
};

export default LoginForm;