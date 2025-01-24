import DoctorLoginForm from "@/components/form/DoctorLoginForm";
import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
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

                    <DoctorLoginForm />

                    <div className="text-12-regular mt-20 flex justify-between">
                        <p>© 2024 Medical Management System</p>
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