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
import DepartmentForm from "./form/DepartmentForm";

const DepartmentModal = ({
    type,
    department
}: {
    type: 'update' | 'delete' | 'create';
    department?: any

}) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {type === 'create' ? (
                    <Button
                        variant="ghost"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded capitalize"
                    >
                        新增科室
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        className={`capitalize 
            ${type === 'update' ? 'text-green-500' : 'text-red-500'}`}
                    >
                        {type}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="shad-dialog sm: max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4 space-y-3">
                </DialogHeader>
                <DepartmentForm
                    type={type}
                    department={department}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    );
}

export default DepartmentModal;