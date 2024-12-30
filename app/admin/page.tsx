import StatCard from '@/components/StatCard';
import { columns, Payment } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [

        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
            userId: "1",
            patient: {
                id: "t1",
                name: "John Doe",
                age: 30,
            },
            schedule:"2022-05-10 10:00 AM",
            doctorId: 10086,
        },

        // ...
    ]
}

const Admin = async () => {
    const data = await getData();
    // const appointmentData = await getAppointmentData();
    return (

        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href='/'>
                    <Image
                        src='/assets/icons/logo-full.svg'
                        height={24}
                        width={120}
                        alt='Logo'
                        className='h8 w-fit'
                    />
                </Link>
                <p className='text-xl font-bold'>Admin Dashboard</p>

            </header>
            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Welcome to Admin Dashboard</h1>
                    <p className='text-dark-700'>Here you can manage all the data of the system.</p>
                </section>
                <section className='admin-stat'>
                    <StatCard
                        type='appointments'
                        count={5} // appointmentData.shcheduledCount
                        label="Scheduled Appointments"
                        icon='/assets/icons/appointments.svg'
                    />
                    <StatCard
                        type='pending'
                        count={12} // appointmentData.pendingCount
                        label="pending Appointments"
                        icon='/assets/icons/pending.svg'
                    />
                    <StatCard
                        type='cancelled'
                        count={3}   // appointmentData.cancelledCount
                        label="cancelled Appointments"
                        icon='/assets/icons/cancelled.svg'
                    />

                </section>
                <DataTable data={data} columns={columns} />

            </main>

        </div>
    )
};

export default Admin;