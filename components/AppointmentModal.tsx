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
import AppointmentForm from "./form/AppointmentForm";


const AppointmentModal = ({ 
    type,
    userId,
    patientId,
    appointment
}:{
    type:'schedule' | 'cancel'
    userId?: string
    patientId?: string
    appointment?: any

    }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className={`capitalize 
                    ${type === 'schedule' && 'text-green-500'}
                    ${type === 'cancel' && 'text-red-500'}
                `}>
                    {type}
                </Button>
                
            </DialogTrigger>
            <DialogContent className="shad-dialog sm: max-w-md">
                <DialogHeader className="mb-4 space-y-3">
                    <DialogTitle>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please enter the reason for {type} the appointment.
                    </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                    userId={userId}
                    patientId={patientId}
                    appointment={appointment}
                    type={type}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    );
}

export default AppointmentModal;