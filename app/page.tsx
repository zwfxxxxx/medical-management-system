import LoginForm from "@/components/form/LoginForm";
import PatientForm from "@/components/form/LoginForm";
import PasskeyModal from "@/components/passkeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  const isDoctor = searchParams.doctor === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
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

          <div className="text-12-regular mt-20 flex justify-between">
            <p>© 2024 Medical Management System</p>
            <div className="flex gap-4">
              <Link href="/doctor" className="text-green-500">doctor</Link>
              <Link href="/?admin=true" className="text-green-500">admin</Link>
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