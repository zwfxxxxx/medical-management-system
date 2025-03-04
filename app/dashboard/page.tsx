'use client';

import SearchModal from '@/components/SearchModal';
import { getDoctorTreatmentData } from '@/lib/action/doctor';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { set } from 'zod';
// import io from 'socket.io-client';


interface Doctor {
    id: string; // 假设id是数值类型
    name: string;
    department: string;
    status: string;
    currentPatient?: { id: string; name: string}; // 当前患者可选
    queue: { id: string; name: string}[]; // 排队患者
}


export default function Home() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [department, setDepartment] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDoctorTreatmentData(department);
            setDoctors(result);
        };

        fetchData(); // 调用获取数据的函数

        const interval = setInterval(fetchData, 10000); // 每10秒更新一次数据
        return () => clearInterval(interval);
    }, [department]);


    return (
        <div className="container p-4">
            <h1 className="text-2xl font-bold mb-4">医疗管理系统主页</h1>
            <div>
                <SearchModal setDepartment={setDepartment} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!doctors ? (
                    <div className="container text-center">
                        <p className="text-gray-500">暂无数据</p>
                    </div>
                ) : (doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 border rounded-lg shadow">
                        <h2 className="text-xl font-semibold">{doctor.name}</h2>
                        <p className="text-gray-600">科室: {doctor.department}</p>
                        <div className="mt-4">
                            <h3 className="font-medium">正在就诊患者</h3>
                            {doctor.currentPatient ? (
                                <div className="mt-2 p-2 text-green-500">
                                    {doctor.currentPatient.name}
                                </div>
                            ) : (
                                <p className="text-gray-500">暂无</p>
                            )}
                        </div>
                        <div className="mt-4">
                            <h3 className="font-medium">排队患者</h3>
                            <ul className="list-disc pl-5">
                                {doctor.queue.length === 0 ? (
                                    <li className="text-gray-500">暂无</li>
                                ) : (doctor.queue.map((patient) => (
                                    <li key={patient.id}>
                                        {patient.name}
                                    </li>
                                )))}
                            </ul>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
}
