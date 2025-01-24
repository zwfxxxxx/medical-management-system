import PatientRegisterForm from '@/components/form/PatientRegisterFrom';
import Image from 'next/image';
import React from 'react';

const Register = ({ params: { userId } }: SearchParamProps) => {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[800px] flex-1 flex-col py-20">
                    <Image
                        alt="patient"
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />
                    
                    <PatientRegisterForm
                        userId={userId}
                    />

                    <p className='copyright py-12'>© 2024 Medical Management System</p>
                </div>
            </section>
            <Image
                alt="background"
                src="/assets/images/register-img.png"
                width={1000}
                height={1000}
                className="side-img max-w-[420px]"
            />
        </div>
    )
}

export default Register;