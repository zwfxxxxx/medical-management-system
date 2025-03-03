'use client'

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authState";
import { useRouter } from "next/navigation";
import { getPatientAppointments } from "@/lib/action/appointment.action";
import { DataTable } from "@/components/table/DataTable";
import { userColumns } from "@/components/table/UserCoolumn";
import Link from "next/link";
import Image from "next/image";

const AppointmentRecord = () => {
    const { user } = useAuthStore();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPatientAppointments(user.userId);
                setAppointments(data);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
            }
        };

        fetchData();
    }, [user.userId]);

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href="/" className="mr-4 transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>
                <h1 className='text-3xl font-bold text-center special-font'>预约记录</h1>
            </header>
            <main className='admin-main'>
                <DataTable data={appointments} columns={userColumns} />
            </main>
        </div>
    );
};

export default AppointmentRecord;
