'use client'

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { columns } from '@/components/table/columns';
import Link from 'next/link';
import React from 'react';
import { createDepartment, getDepartments } from '@/lib/action/department.action';
import { departmentColumns } from '@/components/table/DepartmentColumn';
import DepartmentModal from '@/components/DepartmentModal';
import Image from 'next/image';

const DepartmentManagement = () => {
    const [departmentsData, setDepartmentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartments = async () => {
            const data = await getDepartments();
            setDepartmentsData(data);
            setLoading(false);
        };
        fetchDepartments();
    }, []);

    if (loading) return (
        <div className='flex items-center justify-center h-screen'>
            <p className='text-lg text-blue-200 font-semibold'>加载中...</p>
        </div>
    )


    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href="/admin" className="mr-4 transition-transform transform hover:scale-105 active:scale-95">
                    <Image src="/assets/icons/back.svg" width={24} height={24} alt="back" />
                </Link>


                <h1 className='text-2xl font-bold text-white'>科室管理</h1>
                <DepartmentModal
                    type={"create"}
                    department={departmentsData}
                />
            </header>
            <main className='admin-main'>
                <DataTable data={departmentsData} columns={departmentColumns} />
            </main>
        </div>
    );
};

export default DepartmentManagement;
