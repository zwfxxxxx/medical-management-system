import RegisterForm from "@/components/form/PatientRegisterFrom";
import RegisterUserForm from "@/components/form/RegisterUserForm";
import PasskeyModal from "@/components/passkeyModal";
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
                    <RegisterUserForm/>


                    <div className="text-12-regular mt-20 flex justify-between">
                        <p>© 2024 Medical Management System</p>
                        <Link href="/?admin=true" className="text-green-500">admin</Link>
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