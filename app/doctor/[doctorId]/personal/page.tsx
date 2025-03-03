"use client";

import PatientPersonalForm from "@/components/form/PatientPersonalForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authState";
import { useRouter } from "next/navigation";
import { getPatient } from "@/lib/action/patient.action";
import DoctorForm from "@/components/form/DoctorForm";

interface RegisterProps {
    searchParams: Record<string, any>; // 更加严格的类型定义
}

export default async function Register({ searchParams }: RegisterProps) {
    const { user, logout } = useAuthStore();
    const router = useRouter();                         
    const handleLogout = () => {
        logout();
        router.push("/login");
    };
    // const patientData = await getPatient(user.userId)

    return (
        <div>
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[80%] mx-auto">
                    <Link href="/" className="mr-4 transition-transform transform hover:scale-105 active:scale-95">
                        <Image src="/assets/icons/back.svg" width={44} height={44} alt="返回" />
                    </Link>
                    <DoctorForm type="update"/>
                </div>
                <div className="max-w-[80%] mx-auto"> {/* 提取样式 */}
                    <Button
                        type="button"
                        className="shad-danger-btn w-full"
                        onClick={handleLogout}
                    >
                退出登录
            </Button>
        </div>
            </section >
        </div >
    );
}
