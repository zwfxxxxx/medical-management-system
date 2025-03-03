"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const DoctorsPage = () => {
    // 示例医生数据
    const doctors = [
        {
            id: 1,
            name: "Dr. 张三",
            specialty: "心脏内科",
            image: "/assets/doctors/doctor1.jpg",
            description: "经验丰富的心脏病专家，擅长各类心血管疾病的诊治。",
        },
        {
            id: 2,
            name: "Dr. 李四",
            specialty: "神经外科",
            image: "/assets/doctors/doctor2.jpg",
            description: "专注于脑部手术，拥有多年临床经验。",
        },
        // 可继续添加更多医生
    ];

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <Link href="/" className="inline-block p-2 bg-gray-100 rounded-full transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>
            </header>
            <main>
                <h1 className="text-2xl font-bold mb-4">医生信息</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
                        >
                            <Image
                                src={doctor.image}
                                alt={doctor.name}
                                width={150}
                                height={150}
                                className="rounded-full mb-4"
                            />
                            <h2 className="text-xl font-semibold">{doctor.name}</h2>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <p className="mt-2 text-sm">{doctor.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DoctorsPage;
