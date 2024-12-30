"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const MedicalDashboard = () => {
    const [patients, setPatients] = useState([
        { id: 1, name: '张三', disease: '高血压', priority: 1, status: '待诊断' },
        { id: 2, name: '李四', disease: '糖尿病', priority: 2, status: '待诊断' },
    ]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [diagnosis, setDiagnosis] = useState('');

    const handleSetAvailable = (id: number) => {
        const updatedPatients = patients.map((patient) =>
            patient.id === id ? { ...patient, status: '可就诊' } : patient
        );
        setPatients(updatedPatients);
    };

    const handleDiagnosisSubmit = () => {
        if (selectedPatient && diagnosis) {
            const updatedPatients = patients.map((patient) =>
                patient.id === selectedPatient.id
                    ? { ...patient, status: '诊断完成', diagnosis }
                    : patient
            );
            setPatients(updatedPatients);
            setDiagnosis('');
        }
    };

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-3xl font-semibold">医生操作界面</h1>

            <div className="flex justify-between">
                <div className="w-full max-w-xs space-y-4">
                    <h2 className="text-xl font-medium">患者列表</h2>
                    {patients.sort((a, b) => a.priority - b.priority).map((patient) => (
                        <Card key={patient.id} className="p-4 mb-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{patient.name}</h3>
                                    <p className="text-gray-500">疾病: {patient.disease}</p>
                                </div>
                                <div className="flex space-x-4">
                                    <Button
                                        onClick={() => handleSetAvailable(patient.id)}
                                        className="bg-green-500 hover:bg-green-600"
                                    >
                                        设置为可就诊
                                    </Button>
                                    <Button
                                        onClick={() => setSelectedPatient(patient)}
                                        className="bg-blue-500 hover:bg-blue-600"
                                    >
                                        查看诊断
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm mt-2 text-gray-400">当前状态: {patient.status}</p>
                        </Card>
                    ))}
                </div>

                {selectedPatient && (
                    <div className="w-full max-w-lg space-y-4">
                        <h2 className="text-xl font-medium">提交诊断结果</h2>
                        <div className="border p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                            <p className="text-sm text-gray-500">疾病: {selectedPatient.disease}</p>

                            <div className="mt-4">
                                <label htmlFor="diagnosis" className="block text-sm font-medium">
                                    诊断结果
                                </label>
                                <textarea
                                    id="diagnosis"
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                    className="mt-2 w-full p-2 border rounded-lg"
                                    rows={4}
                                    placeholder="输入诊断结果"
                                />
                            </div>

                            <Button
                                onClick={handleDiagnosisSubmit}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 w-full"
                            >
                                提交诊断结果
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalDashboard;
