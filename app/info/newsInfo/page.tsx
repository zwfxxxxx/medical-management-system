"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AnnouncementsPage = () => {
    const announcements = [
        {
            id: 1,
            title: "年度体检通知",
            date: "2025-03-01",
            content: "医院将于2025年3月5日启动年度体检活动，请各位患者提前预约。",
        },
        {
            id: 2,
            title: "新增设备公告",
            date: "2025-03-02",
            content: "医院新引进高端心电监护设备，为您的健康保驾护航。",
        },
        // 可继续添加更多公告
    ];

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <Link href="/" className="inline-block p-2 bg-gray-100 rounded-full transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>
            </header>
            <main>
                <h1 className="text-2xl font-bold mb-4">医院公告</h1>
                <div className="space-y-6">
                    {announcements.map((announcement) => (
                        <div
                            key={announcement.id}
                            className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold">{announcement.title}</h2>
                            <p className="text-gray-500 text-sm">{announcement.date}</p>
                            <p className="mt-2">{announcement.content}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AnnouncementsPage;
