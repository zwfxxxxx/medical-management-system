import HeroSection from "./Hero"
import Feature from "./Feature"
import Link from "next/link"
import Image from "next/image"

const LandingPage = () => {
  return (
    <>
      <header className="admin-header" style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={24}
            width={120}
            alt="Logo"
            className="h8 w-fit"
          />
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/login?redirect=schedule"
            className="hover:text-blue-500 transition-colors"
          >
            预约挂号
          </Link>
          <Link href="/login" className="hover:text-blue-500 transition-colors">
            登录
          </Link>
        </div>
      </header>
      <HeroSection />
      <Feature />
    </>
  )
}

export default LandingPage
