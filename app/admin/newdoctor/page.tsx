import React from "react";

import DoctorForm from "@/components/form/DoctorForm";

export default function addDoctorPage() {
    return (
        <div className="addDoctorPage container mt-5 mb-5 text-center text-light bg-dark" >
            <h1 className="mb-5 text-light text-center font-weight-bold">新增医生</h1>
            <DoctorForm type="create" />
        </div>
    )
}