'use client'

import { useState, useEffect } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Control } from "react-hook-form"
import Image from "next/image"
import { getDepartments } from "@/lib/action/department.action"
import { getDoctorsByDepartment } from "@/lib/action/doctor.action"

interface Department {
    id: string
    name: string
}

interface Doctor {
    id: string
    name: string
    avatar?: string
}

interface DepartmentDoctorSelectProps {
    control: Control<any>
    onDepartmentChange?: (departmentId: string) => void
    onDoctorChange?: (doctorId: string) => void
}

const DepartmentDoctorSelect = ({
    control,
    onDepartmentChange,
    onDoctorChange
}: DepartmentDoctorSelectProps) => {
    const [departments, setDepartments] = useState<Department[]>([])
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [isLoadingDepartments, setIsLoadingDepartments] = useState(true)
    const [isLoadingDoctors, setIsLoadingDoctors] = useState(false)
    const [selectedDepartment, setSelectedDepartment] = useState("")

    // 获取部门列表
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getDepartments()
                setDepartments(data)
            } catch (error) {
                console.error("获取部门列表失败:", error)
            } finally {
                setIsLoadingDepartments(false)
            }
        }

        fetchDepartments()
    }, [])

    // 根据部门ID获取医生列表
    useEffect(() => {
        const fetchDoctorsByDepartmentId = async () => {
            if (!selectedDepartment) {
                setDoctors([])
                return
            }

            setIsLoadingDoctors(true)
            try {
                const data = await getDoctorsByDepartment(selectedDepartment)
                setDoctors(data)
            } catch (error) {
                console.error("获取医生列表失败:", error)
            } finally {
                setIsLoadingDoctors(false)
            }
        }

        fetchDoctorsByDepartmentId()
    }, [selectedDepartment])

    // 处理部门选择变化
    const handleDepartmentChange = (value: string) => {
        setSelectedDepartment(value)
        onDepartmentChange?.(value)
    }

    return (
        <div className="space-y-4">
            <FormField
                control={control}
                name="departmentId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">选择科室</FormLabel>
                        <Select
                            disabled={isLoadingDepartments}
                            onValueChange={(value) => {
                                field.onChange(value)
                                handleDepartmentChange(value)
                            }}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="bg-dark-400 border-dark-400 text-gray-200 h-12 hover:bg-dark-300 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500">
                                    <SelectValue 
                                        placeholder={isLoadingDepartments ? "加载中..." : "请选择科室"} 
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-dark-400 border-dark-400">
                                {departments.map((department) => (
                                    <SelectItem 
                                        key={department.id} 
                                        value={department.id.toString()}
                                        className="text-gray-200 hover:bg-dark-300 focus:bg-dark-300 focus:text-white cursor-pointer"
                                    >
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="doctorId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-gray-200">选择医生</FormLabel>
                        <Select
                            disabled={!selectedDepartment || isLoadingDoctors}
                            onValueChange={(value) => {
                                field.onChange(value)
                                onDoctorChange?.(value)
                            }}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="bg-dark-400 border-dark-400 text-gray-200 h-12 hover:bg-dark-300 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500">
                                    <SelectValue 
                                        placeholder={
                                            !selectedDepartment 
                                                ? "请先选择科室" 
                                                : isLoadingDoctors 
                                                    ? "加载中..." 
                                                    : "请选择医生"
                                        } 
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-dark-400 border-dark-400">
                                {doctors.map((doctor) => (
                                    <SelectItem 
                                        key={doctor.id} 
                                        value={doctor.id.toString()}
                                        className="text-gray-200 hover:bg-dark-300 focus:bg-dark-300 focus:text-white cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2 py-1">
                                            <Image
                                                src={doctor.avatar || "/default-avatar.png"}
                                                alt={doctor.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full border border-dark-500"
                                            />
                                            <span>{doctor.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default DepartmentDoctorSelect 