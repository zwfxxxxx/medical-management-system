"use client";

import PatientPersonalForm from "@/components/form/PatientPersonalForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authState";
import { useRouter } from "next/navigation";
import { getPatient } from "@/lib/action/patient.action";
import { useEffect, useState } from "react";

interface RegisterProps {
    searchParams: Record<string, any>; // 更加严格的类型定义
}

export default function Register({ searchParams }: RegisterProps) {
    const { user } = useAuthStore();
    const [patientData, setPatientData] = useState<any>(null);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                console.log("id:", user.userId)
                const data = await getPatient(user.userId);
                setPatientData(data);
            } catch (error) {
                console.error("获取患者数据失败:", error);
            }
        };

        fetchPatientData();
    }, [user.userId]);

    if (!patientData) {
        return <div>加载中...</div>;
    }

    return (
        <div>
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[80%] mx-auto">
                    <Link
                        href="/"
                        className="mr-4 transition-transform transform hover:scale-105 active:scale-95"
                    >
                        <Image
                            src="/assets/icons/back.svg"
                            width={44}
                            height={44}
                            alt="返回"
                        />
                    </Link>
                    <PatientPersonalForm patientData={patientData} />
                </div>
            </section>
        </div>
    );
}
