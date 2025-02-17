import AppointmentForm from "@/components/form/AppointmentForm";
import PatientForm from "@/components/form/LoginForm";
import { getPatient } from "@/lib/action/patient.action";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({params: {patientId}}: SearchParamProps) {
    
    // const patient = await getPatient(patientId);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[640px]">
                    <Image
                        alt="patient"
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />
                    <AppointmentForm 
                        type="create"
                        patientId={patientId}
                    />

                    <p className='copyright py-12'>© 2024 Medical Management System</p>
                </div>
            </section>

            <Image
                alt="appointments"
                src="/assets/images/appointment-img.png"
                width={1000}
                height={1000}
                className="side-img max-w-[390px] bg-bottom"
                priority
            />
        </div>
    );
}