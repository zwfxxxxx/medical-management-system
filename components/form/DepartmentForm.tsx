"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { Form, FormControl, } from "@/components/ui/form"
import CustomFormField from "../CustomForm"
import SubmitButton from "../SubmitButton"
import { useEffect, useState } from "react"
import { DepartmentFormValidation, DoctorFormValidation, getAppointmentSchema } from "@/lib/validation"
import { FormFieldType } from "./LoginForm"
import { SelectItem } from "../ui/select"
import { useRouter } from "next/navigation"
import { getDoctorsData } from "@/lib/action/doctor"
import { createDepartment, deleteDepartment, updateDepartment } from "@/lib/action/department.action"

const DepartmentForm = (
    { type, department, setOpen }:
        {
            type: "create" | "update" | "delete";
            department?: any;
            setOpen?: (open: boolean) => void;
        }
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [doctors, setdoctors] = useState([])
    const form = useForm<z.infer<typeof DepartmentFormValidation>>({
        resolver: zodResolver(DepartmentFormValidation),
        defaultValues: {
            ...department,
            managementDoctor: department?.managementDoctor?.toString() || "",
        },
    })

    useEffect(() => {
        const fetchdoctors = async () => {
            const doctor = await getDoctorsData()
            setdoctors(doctor)
        }
        fetchdoctors()
    }, []);

    async function onSubmit(values: z.infer<typeof DepartmentFormValidation>) {
        setIsLoading(true)
        try {
            if (type === "update") {
                const departmentData = {
                    ...values,
                    id: department.id,
                }
                const result = await updateDepartment(departmentData)

                if (result) {
                    form.reset()
                    setOpen && setOpen(false)
                    window.location.reload();

                }
            } else if (type === "delete") {
                const result = await deleteDepartment(department.id)
                if (result) {
                    setOpen && setOpen(false)
                    window.location.reload();

                }
            } else {
                const newDepartment = {
                    ...values,
                }
                const result = await createDepartment(newDepartment)
                if (result) {
                    form.reset()
                    setOpen && setOpen(false)
                    window.location.reload();
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
                    type === "update" && 
                    <section className="space-y-4">
                        <h1 className="text-blue-300 font-bold text-2xl text-center">修改科室信息</h1>
                    </section>
                }
                {
                    type === "create" && 
                    <section className="space-y-4">
                        <h1 className="text-blue-300 font-bold text-2xl text-center">新增科室</h1>
                    </section>
                }
                {type !== "delete" && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="name"
                            label="科室"
                            placeholder="请输入科室名称"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={form.control}
                            name="description"
                            label="科室描述"
                            placeholder="请输入科室描述"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name="managementDoctor"
                            label="分配负责人"
                            placeholder="请选择对应的管理医生"
                        >
                            {
                                doctors.map((doctor: { id: number; name: string }) => (
                                    <SelectItem
                                        key={doctor.id}
                                        value={doctor.id.toString()}
                                    >
                                        {doctor.name}
                                    </SelectItem>
                                ))
                            }
                        </CustomFormField>


                    </>
                )}
                {type === "delete" && (
                    <section className="space-y-4">
                        <h1 className="text-red-500 font-bold text-2xl text-center">确认删除该科室</h1>
                        <p className="text-center">
                            确认删除该科室信息？此操作不可恢复
                        </p>
                    </section>
                )}

                <SubmitButton isLoading={isLoading} className={`${type === "delete" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>{buttonLabel}</SubmitButton>
            </form>
        </Form>
    )
};

export default DepartmentForm;