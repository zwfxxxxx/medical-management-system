"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const GuidelinesPage = () => {
    const guidelines = [
        "请提前预约，减少等待时间。",
        "就诊时请携带有效身份证件。",
        "特殊情况请提前告知医生或护士。",
        "遵守医院各项规章制度，保持良好秩序。",
        "保持社交距离，佩戴口罩。",
    ];

    return (
        <div className="container mx-auto p-4">
            <header className="mb-8">
                <Link href="/" className="inline-block p-2 bg-gray-100 rounded-full transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>
            </header>
            <main>
                <h1 className="text-2xl font-bold mb-4">就医须知</h1>
                <ul className="list-disc ml-6">
                    {guidelines.map((item, index) => (
                        <li key={index} className="mb-2">
                            {item}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default GuidelinesPage;
