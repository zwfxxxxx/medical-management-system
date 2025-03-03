"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const SchedulePage = () => {
    const schedule = [
        {
            id: 1,
            doctor: "Dr. 张三",
            date: "2025-03-05",
            time: "上午 9:00 - 12:00",
            department: "心脏内科",
        },
        {
            id: 2,
            doctor: "Dr. 李四",
            date: "2025-03-05",
            time: "下午 2:00 - 5:00",
            department: "神经外科",
        },
        // 可继续添加更多出诊记录
    ];

    return (
        <div className="container mx-auto p-8">
            <header className="mb-8">
                <Link href="/" className="inline-block p-2 bg-gray-100 rounded-full transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>
            </header>
            <main>
                <h1 className="text-3xl font-bold mb-6 text-white">出诊安排</h1>
                <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-4 border-b font-semibold text-left text-white">医生</th>
                            <th className="py-3 px-4 border-b font-semibold text-left text-white">日期</th>
                            <th className="py-3 px-4 border-b font-semibold text-left text-white">时间</th>
                            <th className="py-3 px-4 border-b font-semibold text-left text-white">科室</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-700 transition-colors">
                                <td className="py-3 px-4 border-b text-white">{item.doctor}</td>
                                <td className="py-3 px-4 border-b text-white">{item.date}</td>
                                <td className="py-3 px-4 border-b text-white">{item.time}</td>
                                <td className="py-3 px-4 border-b text-white">{item.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default SchedulePage;
