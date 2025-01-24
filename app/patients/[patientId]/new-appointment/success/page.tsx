import AppointmentForm from "@/components/form/AppointmentForm";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/action/appointment.action";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Success = async ({ params: { patientId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doctor) => doctor.doctorId === appointment.doctorId);

    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        alt="logo"
                        width={1000}
                        height={1000}
                        className="h-10 w-fit"
                    />
                </Link>
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
                            src={doctor?.image!}
                            alt="doctor-image"
                            width={100}
                            height={100}
                            className="size-6"
                        />
                        <p className="whitespase-nowrap">{doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/location.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p className="text-lg font-bold">{(doctor?.department || "？？？？")}</p>
                        <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p className="text-lg font-bold">{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                <div className="flex flew-col items-center justify-center gap-10">
                    <Button
                        variant="outline"
                        className="shad-primary-btn w-fit rounded-lg shadow-md px-8 py-3 text-blue-400 border-blue-300 bg-white hover:bg-blue-200 hover:text-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        asChild
                    >
                        <Link href={`/dashboard`}>
                            回到首页
                        </Link>
                    </Button>
                </div>




                <p className='copyright py-12'>© 2024 Medical Management System</p>

            </div>
        </div>
    );
}

export default Success;