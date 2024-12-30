"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { Form,} from "@/components/ui/form"
import CustomFormField from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { createUser, userLogin } from "@/lib/action/patient.action"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./LoginForm"
import { doctorLogin } from "@/lib/action/doctor"

const LoginForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            phone: "",
            password: ""
        },
    })

    async function onSubmit({phone, password}: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)
        try {
            const doctor = {phone, password}
            const doctorData = await doctorLogin(doctor);
            // localStorage.setItem('token', userData.token);
            if (doctorData) router.push(`/doctor/${doctorData.doctorId}/dashboard`);
        }catch(error) {
            console.log("error", error)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="space-y-4">
                    <h1 className="text-blue-300 font-extrabold text-3xl">医生登录</h1>
                </section>
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
                {/* <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="phone number"
                    placeholder="手机号码"
                    iconSrc='/assets/icons/phone.svg'
                    iconAlt='phone'
                /> */}
                {/* <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label=""
                    placeholder="你的姓名"
                    iconSrc='/assets/icons/user.svg'
                    iconAlt='user'
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="email"
                    placeholder="邮箱"
                    iconSrc='/assets/icons/email.svg'
                    iconAlt='email'
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="phone number"
                    placeholder="手机号码"
                    iconSrc='/assets/icons/phone.svg'
                    iconAlt='phone'
                /> */}
                <SubmitButton isLoading={isLoading}>登录</SubmitButton>
            </form>
        </Form>
    )
};

export default LoginForm;