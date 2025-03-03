"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import DoctorModal from "../DoctorModal";
import Link from "next/link";
import UserAppointmentsModal from "../UserAppointmentsModal";

// 定义表格数据类型
export type UserAppointment = {
    id: string;
    patientName: string;
    doctorName: string;
    patientGender: "男" | "女";
    patientAge: number;
    departmentName: string;
    schedule: string;
    appointmentStatus: "pending" | "scheduled" | "completed";
    reason: string;

};

// 定义表格列
export const userColumns: ColumnDef<UserAppointment>[] = [
    {
        header: "ID",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },
    {
        accessorKey: "patientName",
        header: "患者姓名",
        cell: ({ row }) => <p className="text-14-medium">{row.original.patientName}</p>,
    },
    {
        accessorKey: "doctorName",
        header: "就诊医生",
        cell: ({ row }) => <p className="text-14-medium">{row.original.doctorName}</p>,
    },
    {
        accessorKey: "schedule",
        header: "预约时间",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        ),
    },
    {
        accessorKey: "status",
        header: "状态",
        cell: ({ row }) => (
            <div className="min-w-[115px]">
                <StatusBadge status={row.original.appointmentStatus} />
            </div>
        ),
    },
    {
        accessorKey: "reason",
        header: "症状描述",
        cell: ({ row }) => <p className="text-14-regular">{row.original.reason}</p>,
    },

    {
        id: "actions",
        header: () => (
            <div className="pl-4 flex items-center justify-between">
                操作
            </div>
        ),
        cell: ({ row: { original: data } }) => {
            return (
                <div className="flex gap-1">
                    <UserAppointmentsModal
                        type={data.appointmentStatus}
                        userAppointment={data}
                    />
                </div>
            );
        },
    },
];
