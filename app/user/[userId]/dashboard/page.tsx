import React from "react";
import { DataTable } from "@/components/table/DataTable";
import { UserAppointment, userColumns } from "@/components/table/UserCoolumn";
import Link from "next/link";
import Image from "next/image";
import { getAppointments } from "@/lib/action/appointment.action";


const userPage = async ({ params: { userId } }: SearchParamProps) => {
    const userAppointments = await getAppointments(userId);

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
                <div className="flex gap-4 items-center">
                    <Link href={`/user/${userId}/patientRegister`} className="hover:text-blue-500 transition-colors">
                        预约挂号
                    </Link>
                    <Link href="/" className="hover:text-blue-500 transition-colors">
                        健康ai助手
                    </Link>
                    <Link href={`/user/${userId}/personal`}>
                        <Image
                            src='/assets/icons/userinfo.svg'
                            height={34}
                            width={34}
                            alt='UserInfo'
                            title="个人信息"
                            className="hover:scale-110 transition-transform"
                        />
                    </Link>
                </div>
            </header>
            <main className="flex-1 flex flex-col space-y-4">
                <section className='w-full space-y-4'>
                    <div className='flex flex-col gap-4'>


                    </div>
                </section>


                <section className='w-full space-y-12'>
                    <h1 className='header'>欢迎来到慧医系统</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {/* 医生信息模块 */}
                        <Link
                            href="/doctors"
                            className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center py-5">
                                <Image
                                    src="/assets/icons/doctorteam.svg"
                                    alt="医生信息"
                                    width={50}
                                    height={50}
                                    className="object-cover hover:scale-110 transition-transform"
                                />
                                <p className="text-sm text-center mt-5 text-gray-300">了解我们的医生团队</p>
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
                <p className='text-dark-700'>你的预约记录</p>
                <DataTable columns={userColumns} data={userAppointments} />

            </main>

        </div>
    );
}

export default userPage;
