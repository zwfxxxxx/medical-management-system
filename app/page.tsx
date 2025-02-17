'use client'; // 确保这是一个客户端组件

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { QueueStatus } from '@/components/QueueStatus';
import { cn } from "@/lib/utils";
import { UserButton } from '@/components/UserButton';
import { AppointmentLink } from '@/components/AppointmentLink';

const userPage = ({ params: { userId } }: SearchParamProps) => {
    const [doctorId, setDoctorId] = useState<string | null>(null);

    useEffect(() => {
        // 从 localStorage 中获取 doctorId 并设置到状态中
        const storedDoctorId = window.localStorage.getItem('doctorId');
        if (storedDoctorId) {
            setDoctorId(storedDoctorId);
        }
    }, []);

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-8'>
            {/* 导航栏 */}
            <header className='sticky top-0 z-50 backdrop-blur-md bg-black-800/80 transition-all duration-300'>
                <nav className='flex items-center justify-between px-6 py-4'>
                    <Link href='/'>
                        <Image
                            src='/assets/icons/logo-full.svg'
                            height={24}
                            width={120}
                            alt='Logo'
                            className='h-8 w-fit'
                        />
                    </Link>
                    <div className="flex gap-6 items-center">
                        <AppointmentLink />
                        <Link href="/" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <Image
                                src='/assets/icons/ai.svg'
                                height={20}
                                width={20}
                                alt='AI'
                            />
                            健康AI助手
                        </Link>
                        <UserButton />
                    </div>
                </nav>
            </header>

            <main className="flex-1 flex flex-col px-6 pb-8">
                {/* 欢迎区域 */}
                <section className='mb-12'>
                    <h1 className='text-3xl font-bold mb-8'>欢迎来到慧医系统</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 医生信息模块 */}
                        <Link
                            href="/doctors"
                            className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center py-5">
                                <Image
                                    src="/assets/icons/doctorteam.svg"
                                    alt="医生信息"
                                    width={40}
                                    height={40}
                                    className="transition-transform group-hover:scale-110"
                                />
                                <p className="text-gray-300 group-hover:text-blue-400 transition-colors">
                                    了解我们的医生团队
                                </p>
                            </div>
                        </Link>

                        {/* 就医须知模块 */}
                        <Link
                            href="/guidelines"
                            className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center py-5">
                                <Image
                                    src="/assets/icons/tips.svg"
                                    alt="就医须知"
                                    width={50}
                                    height={50}
                                    className="object-cover hover:scale-110 transition-transform"
                                />
                                <p className="text-sm mt-5 text-center text-gray-300">熟悉就医流程与注意事项</p>
                            </div>
                        </Link>

                        {/* 公告模块 */}
                        <Link
                            href="/announcements"
                            className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center py-5">
                                <Image
                                    src="/assets/icons/tonggao.svg"
                                    alt="公告"
                                    width={50}
                                    height={50}
                                    className="object-cover hover:scale-110 transition-transform"
                                />
                                <p className="text-sm text-center mt-5 text-gray-300">查看最新公告与通知</p>
                            </div>
                        </Link>

                        {/* 出诊表模块 */}
                        <Link
                            href="/schedule"
                            className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center py-5">
                                <Image
                                    src="/assets/icons/schedule.svg"
                                    alt="出诊表"
                                    width={50}
                                    height={50}
                                    className="object-cover hover:scale-110 transition-transform"
                                />
                                <p className="text-sm mt-5 text-center text-gray-300">查看医生出诊安排</p>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* 就诊状态区域 */}
                <section className='w-full bg-gray-800/30 rounded-xl p-6'>
                    <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                        实时就诊状态    
                    </h2>
                    <QueueStatus />
                </section>
            </main>
            <div className="text-12-regular mt-20 flex justify-between">
                <p>© 2024 Medical Management System</p>
                <div className="flex gap-4">
                    {/* 条件渲染 doctor 链接 */}
                    {doctorId ? (
                        <Link href={`/doctor/${doctorId}/dashboard`} className="text-green-500">
                            doctor
                        </Link>
                    ) : (
                        <Link href="/doctor" className="text-green-500">
                            doctor
                        </Link>
                    )}
                    <Link href="/admin" className="text-green-500">
                        admin
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default userPage;
