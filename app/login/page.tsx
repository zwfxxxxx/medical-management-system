'use client';

import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    
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

                    <LoginForm />
                    <div className="mt-6 text-center">
                        <Link href="/register">
                            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300">
                                注册
                            </button>
                        </Link>
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