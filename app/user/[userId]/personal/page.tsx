import PatientPersonalForm from "@/components/form/PatientPersonalForm";
import Image from "next/image";
import Link from "next/link";

export default function Register({ searchParams }: SearchParamProps) {
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[496px]">
                    <Image
                        alt="patient"
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        className="mb-12 h-10 w-fit"
                    />
                    <PatientPersonalForm userId="1" patientData={{}}/>
                    <div className="text-12-regular mt-20 flex justify-between">
                        <p>© 2024 Medical Management System</p>
                        <div className="flex gap-4">
                            <Link href="/login" className="text-green-500">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Image
                alt="background"
                src="/assets/images/onboarding-img.png"
                width={1000}
                height={1000}
                className="side-img max-w-[50%]"
                priority
            />
        </div>
    );
}
