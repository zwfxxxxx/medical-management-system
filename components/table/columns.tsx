"use client";

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

export type doctor = {
  id: number;
  name: string;
  password: string;
  gender: "男" | "女";
  department: string;
  email: string;
  phone: string;
  qualification: string;
  availability: string;
  profile_picture: string;
  position: string;
  biography: string;
  status: "active" | "inactive";
}

export const columns: ColumnDef<doctor>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "医生",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.name}</p>
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
    accessorKey: "department",
    header: "科室",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {row.original.department}
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: "电话",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {row.original.phone}
      </p>
    ),
  },
  {
    id: "actions",
    header: () => (
      <div className="pl-4 flex items-center justify-between">
        操作
        <Link href={`admin/newdoctor`}>
          <Image
            src="assets/icons/Plus.svg"
            width={24}
            height={24}
            className="ml-1 text-gray-500"
            alt="add"
          />
        </Link>
      </div>
    ),
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <DoctorModal
            type="update"
            doctor={data}
          />
          <DoctorModal type="delete" doctor={data} />
        </div>
      );
    },
  },
];



// export const columns: ColumnDef<Payment>[] = [
//   {
//     header: "ID",
//     cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
//   },
//   {
//     accessorKey: "patient",
//     header: "Patient",
//     cell: ({ row }) => (
//       <p className="text-14-medium">{row.original.patient.name}</p>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="min-w-[115px]">
//         <StatusBadge status={row.original.status} />
//       </div>
//     ),
//   },
//   {
//     accessorKey: "schedule",
//     header: "appointment",
//     cell: ({ row }) => (
//       <p className="text-14-regular min-w-[100px]">
//         {formatDateTime(row.original.schedule).dateTime}
//       </p>
//     ),
//   },
//   {
//     accessorKey: "primaryPhysician",
//     header: () => "Doctor",
//     cell: ({ row }) => {
//       const doctor = Doctors.find(
//         (doc) => doc.doctorId === row.original.doctorId
//       );
//       return (
//         <div className="flex items-center gap-3">
//           <Image
//             src={doctor?.image || "/doctor.png"}
//             alt={doctor?.name || "Doctor"}
//             width={100}
//             height={100}
//             className="size-8"
//           />
//           <p className="whitespace-nowrap">{doctor?.name}</p>
//         </div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     header: () => (
//       <div className="pl-4 flex items-center justify-between">
//         Actions{" "}
//         <Image
//           src="assets/icons/Plus.svg"
//           width={24}
//           height={24}
//           className="ml-1 text-gray-500"
//           alt="add"
//         />
//       </div>
//     ),
//     cell: ({ row: { original: data } }) => {
//       return (
//         <div className="flex gap-1">
//           <AppointmentModal
//             type="schedule"
//             patientId={data.patient.id}
//             userId={data.userId}
//             appointment={data}
//           />
//           <AppointmentModal type="cancel" appointment={data} />
//         </div>
//       );
//     },
//   },
// ];
