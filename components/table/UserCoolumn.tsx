"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

// 定义表格数据类型
export type UserAppointment = {
    id: string;
    patientName: string;
    schedule: string;
    status: "pending" | "scheduled" | "cancelled";
    doctorId: number;
    reason: string;
    cancellationReason: string | null;
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
                <StatusBadge status={row.original.status} />
            </div>
        ),
    },
    {
        accessorKey: "doctorId",
        header: "负责医生",
        cell: ({ row }) => {
            const doctor = Doctors.find((doc) => doc.doctorId === row.original.doctorId);
            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image || "/doctor.png"}
                        alt={doctor?.name || "Doctor"}
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">{doctor?.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "reason",
        header: "症状描述",
        cell: ({ row }) => <p className="text-14-regular">{row.original.reason}</p>,
    },
    {
        accessorKey: "cancellationReason",
        header: "取消预约原因",
        cell: ({ row }) =>
            row.original.cancellationReason ? (
                <p className="text-14-regular text-red-500">{row.original.cancellationReason}</p>
            ) : (
                <p className="text-14-regular text-gray-500">未取消预约</p>
            ),
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row: { original: data } }) => {
            return (
                <div className="flex gap-1">
                    <AppointmentModal
                        type="cancel"
                        appointment={data}
                    />
                </div>
            )
        }
    }
];
