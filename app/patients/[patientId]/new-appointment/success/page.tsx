import AppointmentForm from "@/components/form/AppointmentForm";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/action/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({ params: { patientId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointmentData = await getAppointment(appointmentId);

    // const doctor = Doctors.find((doctor) => doctor.doctorId === appointment.doctorId);

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-gray-400">就诊人</span>
                    <p className="text-lg font-semibold text-blue-300">
                        {appointmentData.patientName}
                    </p>
                </div>
                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        alt="appointment-success"
                        width={300}
                        height={300}
                    />
                    <h2 className="text-green-500">
                        你已经成功预约！
                    </h2>

                </section>

                <section className="request-details ">
                    <p className="text-lg font-bold">预约信息：</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={appointmentData?.image!}
                            alt="doctor-image"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespase-nowrap">{appointmentData?.doctorName}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/location.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p className="text-lg font-bold">{appointmentData.departmentName}{(appointmentData?.position || "？？？？")}</p>
                        <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p className="text-lg font-bold">{formatDateTime(appointmentData.appointmentSchedule).dateTime}</p>
                    </div>
                </section>
                <div className="flex items-center justify-center gap-6 mt-8">
                    <Button
                        variant="outline"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium border-none rounded-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                    >
                        <Link href={`/`}>
                            返回首页
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-white text-blue-500 font-medium border-blue-500 hover:bg-blue-50 rounded-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                    >
                        <Link href={`/patients/${patientId}/appointments`}>
                            查看预约
                        </Link>
                    </Button>
                </div>




                <p className='copyright py-12'>© 2024 Medical Management System</p>

            </div>
        </div>
    );
}

export default Success;