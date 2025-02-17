"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import DoctorModal from "../DoctorModal";
import Link from "next/link";
import DepartmentModal from "../DepartmentModal";

export type department = {
    name: string;
    description: string;
    managementDoctorName: string;
    phone: string;
}

export const departmentColumns: ColumnDef<department>[] = [
    {
        header: " ",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
        accessorKey: "name",
        header: "科室",
        cell: ({ row }) => (
            <p className="text-14-medium">{row.original.name}</p>
        ),
    },
    {
        accessorKey: "description",
        header: "描述",
        cell: ({ row }) => {
            const description = row.original.description || '';

            return (
                <div className="relative">
                    <p
                        className="text-14-medium overflow-hidden max-w-[150px] whitespace-nowrap text-ellipsis"
                        title={description.length > 10 ? description : ''}
                    >
                        {description.length > 10 ? `${description.substring(0, 10)}...` : description}
                    </p>
                </div>
            );
        },
    },
    {
        accessorKey: "managementDoctorName",
        header: "负责人",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {row.original.managementDoctorName}
            </p>
        )
    },
    {
        accessorKey: "phone",
        header: "负责人电话",
        cell: ({ row }) => (
            <p className="text-14-regular min-w-[100px]">
                {row.original.phone}
            </p>
        ),
    },
    {
        id: "actions",
        header: () => (
            <p className="text-14-regular min-w-[100px] ml-5">操作</p>
        ),
        cell: ({ row: { original: data } }) => {
            return (
                <div className="flex gap-1">
                    <DepartmentModal
                        type="update"
                        department={data}
                    />
                    <DepartmentModal 
                        type="delete"
                        department={data} 
                    />
                </div>
            );
        },
    },
];
