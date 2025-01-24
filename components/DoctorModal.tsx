'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "./ui/button";
import DoctorForm from "./form/DoctorForm";

const DoctorModal = ({
    type,
    doctor
}: {
    type: 'update' | 'delete' | 'create';
    doctor?: any

}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {type !== 'create' && (
                    <Button variant="ghost" className={`capitalize 
                    ${type === 'update' && 'text-green-500'}
                    ${type === 'delete' && 'text-red-500'}
                `}>
                        {type}
                    </Button>
                )
                }
            </DialogTrigger>
            <DialogContent className="shad-dialog sm: max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4 space-y-3">
                </DialogHeader>
                <DoctorForm
                    doctor={doctor}
                    type={type}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    );
}

export default DoctorModal;