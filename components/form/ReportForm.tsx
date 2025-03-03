"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { Form, FormControl, } from "@/components/ui/form"
import { Button } from "../ui/button"
import { ReportFormValidation } from "@/lib/validation"
import CustomFormField from "../CustomForm"
import { FormFieldType } from "./LoginForm"
import { useEffect, useState } from "react"
import { createReport, getReport, updateReoprt } from "@/lib/action/report.action"
const ReportForm = (
    { type, appointmentId, doctorId, patientId, setOpen, handleStatusChange }:
        {
            type: "create" | "update";
            appointmentId: string;
            doctorId?: string;
            patientId?: string;
            setOpen?: (open: boolean) => void;
            handleStatusChange?: (appointmentId: string, status: 'completed' | 'pending') => void;
        }
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [report, setReport] = useState<any>({})
    useEffect(() => {
        if (type === "update") {
            const fetchReport = async () => {
                const report = await getReport(appointmentId)
                console.log("report",report)
                setReport(report)
            }
            fetchReport()
        }
    }, [appointmentId, type])


    const form = useForm<z.infer<typeof ReportFormValidation>>({
        resolver: zodResolver(ReportFormValidation),
        defaultValues: {
            chief_complaint: report.chief_complaint,
            current_history: report.current_history,
            medical_history: report.medical_history,
            epidemiology: report.epidemiology,
            physical_exam: report.physical_exam,
            auxiliary_tests: report.auxiliary_tests,
            diagnosis: report.diagnosis,
            treatment: report.treatment,
        },
    })

    async function onSubmit(values: z.infer<typeof ReportFormValidation>) {
        setIsLoading(true)
        try {
            if (type === "create") {
                const report = {
                    appointmentId,
                    doctorId,
                    patientId,
                    ...values,
                }
                const result = await createReport(report)
                if (result) {
                    handleStatusChange && handleStatusChange(appointmentId, "completed")
                    form.reset()
                    setOpen && setOpen(false)
                }

            }else {
                const report = {
                    appointmentId,
                    ...values,
                }
                const result = await updateReoprt(report)
                if (result){
                    form.reset()
                    setOpen && setOpen(false)
                }
            }

        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="chief_complaint"
                        label="主诉"
                        placeholder="请输入主诉"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="current_history"
                        label="现病史"
                        placeholder="请输入现病史"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="medical_history"
                        label="既往史"
                        placeholder="请输入既往史"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="epidemiology"
                        label="流行病学史"
                        placeholder="请输入流行病学史"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="family_history"
                        label="家族史"
                        placeholder="请输入家族史"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="physical_exam"
                        label="查体"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="auxiliary_tests"
                        label="辅助检查"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="diagnosis"
                        label="诊断"
                        placeholder="请输入诊断"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="treatment"
                        label="处理"
                        placeholder="请输入处理意见"
                    />
                </>
                <Button className={`${type === "update" ? "shad-gray-btn" : "shad-primary-btn"} w-full`}>{type === "update" ? "确认修改" : "提交诊断意见"}</Button>
            </form>
        </Form>
    )
};

export default ReportForm;