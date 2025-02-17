'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// 后端数据接口
interface AppointmentData {
    appointment_status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
    department_name: string;
    doctor_name: string;
    patient_name: string;
}

// 处理后的数据接口
interface DoctorQueue {
    doctorName: string;
    departmentName: string;
    currentPatient: string | null;  // 当前就诊病人
    waitingPatients: string[];      // 等待队列
}

interface DepartmentInfo {
    name: string;
    doctors: Map<string, DoctorQueue>;  // 使用Map来存储医生信息
}

export const QueueStatus = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [departments, setDepartments] = useState<Map<string, DepartmentInfo>>(new Map());
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 获取预约数据
    const fetchAppointments = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:5000/get_appointments_today');
            const data: AppointmentData[] = await response.json();
            setAppointments(data);
            processAppointments(data);
        } catch (error) {
            console.error('获取预约数据失败:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 处理预约数据
    const processAppointments = (data: AppointmentData[]) => {
        const deptMap = new Map<string, DepartmentInfo>();

        data.forEach(appointment => {
            const { department_name, doctor_name, patient_name, appointment_status } = appointment;

            // 获取或创建科室信息
            if (!deptMap.has(department_name)) {
                deptMap.set(department_name, {
                    name: department_name,
                    doctors: new Map()
                });
            }

            const dept = deptMap.get(department_name)!;

            // 获取或创建医生信息
            if (!dept.doctors.has(doctor_name)) {
                dept.doctors.set(doctor_name, {
                    doctorName: doctor_name,
                    departmentName: department_name,
                    currentPatient: null,
                    waitingPatients: []
                });
            }

            const doctor = dept.doctors.get(doctor_name)!;

            // 根据预约状态更新医生队列
            if (appointment_status === 'pending') {
                doctor.currentPatient = patient_name;
            } else if (appointment_status === 'scheduled') {
                doctor.waitingPatients.push(patient_name);
            }
        });

        setDepartments(deptMap);
        if (!selectedDepartment && deptMap.size > 0) {
            setSelectedDepartment([...deptMap.keys()][0]);
        }
    };

    // 数据获取和自动刷新
    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 30000);
        return () => clearInterval(interval);
    }, []);

    // 优化后的轮播逻辑
    useEffect(() => {
        if (!departments.size || isLoading) return;

        const scrollElements = document.querySelectorAll('.queue-scroll-area');
        if (!scrollElements.length) return;

        const scrollIntervals: NodeJS.Timeout[] = [];

        scrollElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                const interval = setInterval(() => {
                    const maxScroll = element.scrollHeight - element.clientHeight;
                    if (maxScroll <= 0) return; // 如果内容不需要滚动，直接返回

                    if (element.scrollTop >= maxScroll) {
                        // 平滑回到顶部
                        element.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        // 平滑滚动到下一个位置
                        element.scrollTo({
                            top: element.scrollTop + 40,
                            behavior: 'smooth'
                        });
                    }
                }, 3000);

                scrollIntervals.push(interval);
            }
        });

        return () => scrollIntervals.forEach(interval => clearInterval(interval));
    }, [departments, selectedDepartment, isLoading]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <span className="text-gray-300">选择科室：</span>
                <Select
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                    disabled={departments.size === 0}
                >
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder={departments.size === 0 ? "暂无科室数据" : "请选择科室"} />
                    </SelectTrigger>
                    <SelectContent>
                        {[...departments.keys()].map((deptName) => (
                            <SelectItem key={deptName} value={deptName}>
                                {deptName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {departments.size === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    暂无就诊数据
                </div>
            ) : (
                <div className="space-y-4">
                    {selectedDepartment && departments.get(selectedDepartment)?.doctors &&
                        Array.from(departments.get(selectedDepartment)!.doctors.values()).map((doctor) => (
                            <Card key={doctor.doctorName} className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-12 min-h-[120px]">
                                        {/* 左侧：医生信息 */}
                                        <div className="col-span-3 border-r border-gray-700 p-4 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold">{doctor.doctorName}</h3>
                                                <p className="text-sm text-gray-400">{doctor.departmentName}</p>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={`${!!doctor.currentPatient ? 'bg-green-500' : 'bg-blue-500'} text-white w-fit`}
                                            >
                                                {!!doctor.currentPatient ? '就诊中' : '等待中'}
                                            </Badge>
                                        </div>

                                        {/* 中间：当前就诊 */}
                                        <div className="col-span-3 border-r border-gray-700 p-4 flex flex-col">
                                            <h4 className="text-sm font-semibold text-gray-400 mb-2">
                                                当前就诊
                                            </h4>
                                            {doctor.currentPatient ? (
                                                <div className="flex-1 flex items-center">
                                                    <div className="bg-gray-700/50 p-3 rounded-lg w-full">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-green-400">{doctor.currentPatient}</span>
                                                            <span className="text-xs text-gray-400">正在就诊</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex-1 flex items-center justify-center text-gray-500">
                                                    暂无就诊
                                                </div>
                                            )}
                                        </div>

                                        {/* 右侧：等待队列 */}
                                        <div className="col-span-6 p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-sm font-semibold text-gray-400">
                                                    排队患者
                                                </h4>
                                                <span className="text-xs text-gray-400">
                                                    共 {doctor.waitingPatients.length} 人等待
                                                </span>
                                            </div>
                                            <div className="queue-scroll-area overflow-hidden h-[80px]">
                                                <div className="space-y-2">
                                                    {doctor.waitingPatients.map((patientName, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-gray-700/30 p-2 rounded-lg flex justify-between items-center"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400 text-sm">
                                                                    {index + 1}
                                                                </span>
                                                                <span>{patientName}</span>
                                                            </div>
                                                            <span className="text-xs text-gray-400">
                                                                等待中
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            )}
        </div>
    );
}; 