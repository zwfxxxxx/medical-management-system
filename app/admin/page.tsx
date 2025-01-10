import StatCard from '@/components/StatCard';
import { columns } from '@/components/table/columns';
import { DataTable } from '@/components/table/DataTable';
import { getDoctorsData } from '@/lib/action/doctor';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Admin = async () => {
    const doctorsData = await getDoctorsData();
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
                <Link href='/admin/department'>
                    <p className='text-xl font-bold text-white hover:text-yellow-400 transition duration-200 transform hover:scale-105'>
                        科室管理
                    </p>
                </Link>



            </header>
            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>管理员工作台</h1>
                    {/* <p className='text-dark-700'>Here you can manage all the data of the system.</p> */}
                </section>
                <section className='admin-stat'>
                    <StatCard
                        type='appointments'
                        count={5} // appointmentData.shcheduledCount
                        label="在职医生"
                        icon='/assets/icons/appointments.svg'
                    />
                    <StatCard
                        type='pending'
                        count={12} // appointmentData.pendingCount
                        label="值班医生"
                        icon='/assets/icons/pending.svg'
                    />
                    <StatCard
                        type='cancelled'
                        count={3}   // appointmentData.cancelledCount
                        label="休假医生"
                        icon='/assets/icons/cancelled.svg'
                    />

                </section>
                <DataTable data={doctorsData} columns={columns} />

            </main>

        </div>
    )
};

export default Admin;