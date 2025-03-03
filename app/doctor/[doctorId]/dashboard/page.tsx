"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API } from "@/lib/action/API";

import Link from "next/link";
import { useAuthStore } from "@/store/authState";
import UserHead from "@/components/UserHead";
import ReportModal from "@/components/ReportModal";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  qualification: string | null;
  position: string | null;
  profile_picture: string | null;
  biography: string | null;
  status: "active" | "inactive";
  departmentId: number;
}

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  doctor_name: string;
  department_name: string;
  patient_name: string;
  schedule: Date;
  appointment_status: "scheduled" | "pending" | "completed";
  reason: string;
}

const DoctorDashboard = ({ params }: { params: { doctorId: string } }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //     // 直接从 localStorage 检查登录状态
  //     const doctorToken = localStorage.getItem('doctorToken');
  //     const doctorId = localStorage.getItem('doctorId');

  //     if (!doctorToken || !doctorId) {
  //         router.push('/doctor');
  //         return;
  //     }

  //     // 初始化数据
  //     fetchAppointments();
  // }, []);

  // 获取预约信息
  const fetchAppointments = async () => {
    try {
      // const doctorToken = localStorage.getItem("token");
      const response = await API.get(
        `/doctor_appointments/${params.doctorId}`
      );
      console.log("response.data", response.data);
      // 按时间排序
      if (response.data) {
        const sortedAppointments = response.data.sort(
          (a: Appointment, b: Appointment) =>
            new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
        );

        setAppointments(sortedAppointments);
      }
    } catch (error) {
      console.error("获取预约失败:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // 初始化数据
    fetchAppointments();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (
    appointmentId: string,
    newStatus: "pending" | "completed"
  ) => {
    try {
      // 如果要将状态改为pending，先检查是否有其他pending状态的预约
      if (newStatus === "pending") {
        const hasPendingAppointment = appointments.some(
          (apt) => apt.appointment_status === "pending"
        );
        if (hasPendingAppointment) {
          alert("请先完成当前正在诊断的患者");
          return;
        }
      }

      const response = await API.put(
        `/update_appointment_status/${appointmentId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        await fetchAppointments();
      }
    } catch (error) {
      console.error("更新状态失败:", error);
    }
  };

  // const getStatusBadge = (status: string) => {
  //     const statusConfig = {
  //         scheduled: { label: '排队中', className: 'bg-blue-500' },
  //         pending: { label: '诊断中', className: 'bg-yellow-500' },
  //         completed: { label: '已完成', className: 'bg-green-500' }
  //     };
  //     const config = statusConfig[status as keyof typeof statusConfig];
  //     return (
  //         <Badge className={`${config.className} text-white`}>
  //             {config.label}
  //         </Badge>
  //     );
  // };

  const renderAppointmentCard = (
    status: "scheduled" | "pending" | "completed"
  ) => {
    const filteredAppointments = appointments.filter(
      (apt) => apt.appointment_status === status
    );
    const cardStyles = {
      scheduled:
        "border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-blue-500/5",
      pending:
        "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5",
      completed:
        "border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-500/5",
    };
    const titles = {
      scheduled: "候诊队列",
      pending: "当前就诊",
      completed: "已完成就诊",
    };
    const icons = {
      scheduled: "🕒",
      pending: "👨‍⚕️",
      completed: "✅",
    };

    return (
      <Card className={`p-4 ${cardStyles[status]} border-2 shadow-lg max-h-[600px] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icons[status]}</span>
            <h3 className="text-lg font-semibold text-gray-200">
              {titles[status]}
            </h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-7 00/50 text-sm text-gray-300">
            {filteredAppointments.length} 人
          </div>
        </div>
        <div className="space-y-3">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 space-y-3 hover:bg-dark-800 transition-all duration-200 border border-gray-700/50"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-200 text-lg">
                      {appointment.patient_name}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                      {appointment.department_name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    预约时间：{formatDateTime(appointment.schedule).dateTime}
                  </div>
                </div>
                <div className="flex gap-2">
                  {status === "scheduled" && (
                    <Button
                      onClick={() =>
                        handleStatusChange(appointment.id, "pending")
                      }
                      size="sm"
                      className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50"
                    >
                      开始就诊
                    </Button>
                  )}
                  {status === "pending" && (
                    <>
                      <ReportModal
                        type="create"
                        appointmentId={appointment.id}
                        doctorId={appointment.doctorId}
                        patientId={appointment.patientId}
                        handleStatusChange={handleStatusChange}
                      />
                      {/* <Button
                        onClick={() =>
                          handleStatusChange(appointment.id, "completed")
                        }
                        size="sm"
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50"
                      >
                        完成就诊
                      </Button> */}
                    </>

                  )}
                  {status === "completed" && (
                      <ReportModal
                        type="update"
                        appointmentId={appointment.id}
                        handleStatusChange={handleStatusChange}
                      />
                      
                    )}
                </div>
              </div>
              {appointment.reason && (
                <div className="text-sm bg-gray-800/50 rounded p-2 border border-gray-700/30">
                  <span className="text-gray-400">就诊原因：</span>
                  <span className="text-gray-300">{appointment.reason}</span>
                </div>
              )}
            </div>
          ))}
          {filteredAppointments.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-700/50 rounded-lg">
              暂无{titles[status].slice(2)}患者
            </div>
          )}
        </div>
      </Card>
    );
  };


  return (
    <div className="min-h-screen bg-dark-900">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black-800/80 transition-all duration-300">
        <nav className="flex items-center justify-between px-6 py-4">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              height={24}
              width={120}
              alt="Logo"
              className="h-8 w-fit"
            />
          </Link>
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Image
                src="/assets/icons/ai.svg"
                height={20}
                width={20}
                alt="AI"
              />
              健康AI助手
            </Link>
            <div className="relative">
              <UserHead ispatient={false} />
            </div>
          </div>
        </nav>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 pt-6 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {renderAppointmentCard("scheduled")}
          {renderAppointmentCard("pending")}
          {renderAppointmentCard("completed")}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
