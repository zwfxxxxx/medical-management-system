"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { Form, FormControl, } from "@/components/ui/form"
import CustomFormField from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import { DoctorFormValidation, getAppointmentSchema } from "@/lib/validation"
import { FormFieldType } from "./LoginForm"
import { createDoctor, deleteDoctor, updateDoctor } from "@/lib/action/doctor"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { DoctorStatus, GenderOptions } from "@/constants"
import { getDepartments } from "@/lib/action/department.action"
import { SelectItem } from "../ui/select"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

const DoctorForm = (
    { type, doctor, setOpen }:
        {
            type: "create" | "update" | "delete";
            doctor?: any;
            setOpen?: (open: boolean) => void;
        }
) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [departments, setDepartments] = useState([])

    const form = useForm<z.infer<typeof DoctorFormValidation>>({
        resolver: zodResolver(DoctorFormValidation),
        defaultValues: {
            ...doctor,
            departmentId: doctor?.departmentId?.toString(), // 确保类型一致
        },
    })

    useEffect(() => {
        const fetchDepartments = async () => {
            const departments = await getDepartments()
            setDepartments(departments)
        }
        fetchDepartments()
    }, []);

    async function onSubmit(values: z.infer<typeof DoctorFormValidation>) {
        setIsLoading(true)
        try {
            if (type === "update") {
                const doctorData = {
                    id: doctor.id,
                    ...values,
                }
                const result = await updateDoctor(doctorData)

                if (result) {
                    form.reset()
                    setOpen && setOpen(false)
                    window.location.reload();

                }
            } else if (type === "delete") {
                const result = await deleteDoctor(doctor.id)
                if (result) {
                    setOpen && setOpen(false)
                    window.location.reload();

                }
            } else {
                const newDoctor = {
                    ...values,
                }
                const result = await createDoctor(newDoctor)
                if (result) {
                    form.reset()
                    router.push('/admin')
                }
            }

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    let buttonLabel;
    switch (type) {
        case "create":
            buttonLabel = "确认添加"
            break;
        case "update":
            buttonLabel = "确认修改"
            break;
        case "delete":
            buttonLabel = "确认删除"
        default:
            break;
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {
                    type === "update" && <section className="space-y-4">
                        <h1 className="text-blue-300 font-bold text-2xl text-center">修改医生信息</h1>
                    </section>
                }
                {type !== "delete" && (
                    <>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="name"
                                label="姓名"
                                placeholder="请输入医生姓名"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="password"
                                label="密码"
                                placeholder="请输入密码"
                            />
                        </div>

                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="gender"
                            label="性别"
                            renderSkeleton={(feild) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={feild.onChange}
                                        defaultValue={feild.value}>
                                        {
                                            GenderOptions.map((option) => (
                                                <div key={option} className="radio-group">
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={option}
                                                        className="checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300"
                                                    />
                                                    <label
                                                        htmlFor={option}
                                                        className="cursor-pointer cursor-pointer text-gray-600 hover:text-blue-500">
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="email"
                                label="邮箱"
                                placeholder="请输入邮箱"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="phone"
                                label="手机号码"
                                placeholder="请输入手机号码"
                            />
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="qualification"
                                label="学历资质"
                                placeholder="请输入学历资质"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="position"
                                label="办公地点"
                                placeholder="请输入办公地点"
                            />
                        </div>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="departmentId"
                            label="选择科室"
                            placeholder="请选择对应的科室"
                        >
                            {
                                departments.map((department: { id: number; name: string }) => (
                                    <SelectItem
                                        key={department.id}
                                        value={department.id.toString()}
                                    >
                                        {department.name}
                                    </SelectItem>
                                ))
                            }
                        </CustomFormField>


                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="availability"
                            label="值班时间"
                            placeholder="请输入值班时间"
                        />

                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="biography"
                            label="个人简介"
                            placeholder="请输入个人简介"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.SKELETON}
                            control={form.control}
                            name="status"
                            label="是否值班"
                            renderSkeleton={(feild) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap-6 xl:justify-between"
                                        onValueChange={feild.onChange}
                                        defaultValue={feild.value}>
                                        {
                                            DoctorStatus.map((option) => (
                                                <div key={option} className="radio-group">
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={option}
                                                        className="checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300"
                                                    />
                                                    <label
                                                        htmlFor={option}
                                                        className="cursor-pointer cursor-pointer text-gray-600 hover:text-blue-500">
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </>
                )}
                {type === "delete" && (
                    <section className="space-y-4">
                        <h1 className="text-red-500 font-bold text-2xl text-center">确认删除医生信息</h1>
                        <p className="text-center">
                            确认删除医生信息？此操作不可恢复
                        </p>
                    </section>
                )}

                <Button className={`${type === "delete" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>{buttonLabel}</Button>
            </form>
        </Form>
    )
};

export default DoctorForm;