'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ReportForm from "./form/ReportForm";
import { getReport } from "@/lib/action/report.action";

const ReportModal = ({
    type,
    appointmentId,
    doctorId,
    patientId,
    handleStatusChange
}: {
    type: 'update' | 'create';
    appointmentId: string;
    doctorId?: string;
    patientId?: string;
    handleStatusChange: (appointmentId: string, status: 'pending' | 'completed') => void;

}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DialogTrigger asChild>
                    {type === 'create' ? (
                        <Button
                            size="sm"
                            className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                        >
                            完成就诊
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50"
                        >
                            修改就诊意见
                        </Button>
                    )}
                </DialogTrigger>

            </DialogTrigger>
            <DialogContent className="shad-dialog sm: max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle className="text-center font-bold text-2xl text-blue-700">
                        {type === 'create' ? '填写诊断意见' : '修改诊断意见'}
                    </DialogTitle>
                </DialogHeader>
                <ReportForm type={type} appointmentId={appointmentId} doctorId={doctorId} patientId={patientId} handleStatusChange={handleStatusChange} />

            </DialogContent>
        </Dialog>

    );
}

export default ReportModal;