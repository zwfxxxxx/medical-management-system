"use client"

import React from "react"
import { DataTable } from "@/components/table/DataTable"
import { UserAppointment, userColumns } from "@/components/table/UserCoolumn"
import Link from "next/link"
import Image from "next/image"
import { useAuthStore } from "@/store/authState"
import WaitingTable from "@/components/WaitingTable"
import UserHead from "@/components/UserHead"
import LandingPage from "@/components/landing-page"

const Dashboard = () => {
  const userAppointments: UserAppointment[] = []
  const { isLoggedIn, user } = useAuthStore()
  const waitList = [
    {
      doctor: "xx",
      patient: "xxz",
      waiters: [
        { name: "zzx" },
        { name: "vde" },
        { name: "vd2" },
        { name: "vdae" },
        { name: "vdfe" },
        { name: "vdew" },
      ],
    },
    {
      doctor: "xxc",
      patient: "xxzc",
      waiters: [
        { name: "zzxc" },
        { name: "vdec" },
        { name: "vd2c" },
        { name: "vdaec" },
        { name: "vdfec" },
        { name: "vdewc" },
        { name: "zzxcxc" },
        { name: "vdecxc" },
        { name: "vd2cxz" },
        { name: "vdaezxxc" },
        { name: "vdfezxcc" },
        { name: "vdewcxc" },
        { name: "zzxcvxc" },
        { name: "vdecvxc" },
        { name: "vd cv2c" },
        { name: "vda33ec" },
        { name: "vdfeerw3c" },
        { name: "vdewrec" },
        { name: "zzxeerf2c" },
        { name: "vderf3fgc" },
        { name: "vdeew w2c" },
        { name: "vda rw3ec" },
        { name: "vd erfec" },
        { name: "vd feewc" },
      ],
    },
    {
      doctor: "xxcx",
      patient: "xxzcx",
      waiters: [
        { name: "zzxcx" },
        { name: "vdecx" },
        { name: "vd2cx" },
        { name: "vdaecx" },
        { name: "vdfecx" },
        { name: "vdewcx" },
      ],
    },
    {
      doctor: "xxcv",
      patient: "xxzcv",
      waiters: [
        { name: "zzxcv" },
        { name: "vdecv" },
        { name: "vd2cv" },
        { name: "vdaecv" },
        { name: "vdfecv" },
        { name: "vdewcv" },
      ],
    },
    {
      doctor: "xxcb",
      patient: "xxzcb",
      waiters: [
        { name: "zzxcb" },
        { name: "vdecb" },
        { name: "vd2cb" },
        { name: "vdaecb" },
        { name: "vdfecb" },
        { name: "vdewcb" },
      ],
    },
  ]

  return (
    <>
      {isLoggedIn ? (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
          <header className="admin-header">
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
                href={
                  isLoggedIn
                    ? `/patients/${user.userId}/new-appointment`
                    : "/login?redirect=schedule"
                }
                className="hover:text-blue-500 transition-colors"
              >
                预约挂号
              </Link>
              {isLoggedIn ? (
                <UserHead />
              ) : (
                <Link
                  href="/login"
                  className="hover:text-blue-500 transition-colors"
                >
                  登录
                </Link>
              )}
            </div>
          </header>
          <main className="flex-1 flex flex-col space-y-4">
            <section className="w-full space-y-4">
              <div className="flex flex-col gap-4"></div>
            </section>

            <section className="w-full space-y-12">
              <h1 className="header">欢迎来到慧医系统</h1>
              <div className="grid grid-cols-4 gap-6">
                {/* 医生信息模块 */}
                <Link
                  href="/doctors"
                  className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center py-5">
                    <Image
                      src="/assets/icons/doctorteam.svg"
                      alt="医生信息"
                      width={50}
                      height={50}
                      className="object-cover hover:scale-110 transition-transform"
                    />
                    <p className="text-sm text-center mt-5 text-gray-300">
                      了解我们的医生团队
                    </p>
                  </div>
                </Link>

                {/* 就医须知模块 */}
                <Link
                  href="/guidelines"
                  className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center py-5">
                    <Image
                      src="/assets/icons/tips.svg"
                      alt="就医须知"
                      width={50}
                      height={50}
                      className="object-cover hover:scale-110 transition-transform"
                    />
                    <p className="text-sm mt-5 text-center text-gray-300">
                      熟悉就医流程与注意事项
                    </p>
                  </div>
                </Link>

                {/* 公告模块 */}
                <Link
                  href="/announcements"
                  className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center py-5">
                    <Image
                      src="/assets/icons/tonggao.svg"
                      alt="公告"
                      width={50}
                      height={50}
                      className="object-cover hover:scale-110 transition-transform"
                    />
                    <p className="text-sm text-center mt-5 text-gray-300">
                      查看最新公告与通知
                    </p>
                  </div>
                </Link>

                {/* 出诊表模块 */}
                <Link
                  href="/schedule"
                  className="block rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700 hover:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center py-5">
                    <Image
                      src="/assets/icons/schedule.svg"
                      alt="出诊表"
                      width={50}
                      height={50}
                      className="object-cover hover:scale-110 transition-transform"
                    />
                    <p className="text-sm mt-5 text-center text-gray-300">
                      查看医生出诊安排
                    </p>
                  </div>
                </Link>
              </div>
            </section>
            {isLoggedIn ? (
              <>
                <WaitingTable waitList={waitList} />
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="sub-header">关于我们</h2>
                <p className="text-dark-700">
                  <span className="text-light-200 text-xl font-bold">
                    慧医{" "}
                  </span>
                  是一家集医疗、科研、教学、预防保健为一体的现代化综合性医院。我们致力于为患者提供高品质的医疗服务，秉承“以人为本，患者至上”的宗旨，打造值得信赖的医疗品牌。
                </p>
                <h2 className="sub-header">医院特色</h2>
                <h3>1. 顶尖医疗团队</h3>
                <p className="text-dark-700">
                  我们拥有一支由国内外知名专家组成的医疗团队，涵盖多个学科领域，确保为患者提供最专业的诊疗服务
                </p>
                <h3>2. 先进医疗设备</h3>
                <p className="text-dark-700">
                  医院配备了国际领先的医疗设备，如MRI、CT、超声诊断仪等，为精准诊断和治疗提供有力支持。
                </p>
                <h3>3. 多学科协作诊疗（MDT）</h3>
                <p className="text-dark-700">
                  我们采用多学科协作诊疗模式，针对复杂疾病，组织多个科室专家共同会诊，制定个性化治疗方案。
                </p>
                <h3>4. 人性化服务</h3>
                <p className="text-dark-700">
                  医院注重患者体验，提供全程导诊、预约挂号、绿色通道等便捷服务，让患者享受舒适的就医环境。
                </p>
                <h3>5. 智慧医疗</h3>
                <p className="text-dark-700">
                  通过互联网医院、远程会诊、电子病历等智慧医疗系统，实现线上线下无缝衔接，提升就医效率。
                </p>
              </div>
            )}
          </main>
        </div>
      ) : (
        <LandingPage />
      )}
    </>
  )
}

export default Dashboard
