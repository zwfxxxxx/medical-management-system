"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { createUser } from "@/lib/action/patient.action";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./LoginForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import {
  cancelAppointment,
  createAppointment,
} from "@/lib/action/appointment.action";

const AppointmentForm = ({
  userId,
  patientId,
  patientName,
  type,
  appointment,
  setOpen,
}: {
  userId?: string;
  patientId?: string;
  patientName?: string;
  type: "create" | "cancel" | "schedule";
  appointment?: any;
  setOpen?: (open: boolean) => void;
}) => {
  const AppointmentValidation = getAppointmentSchema(type);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AppointmentValidation>>({
    resolver: zodResolver(AppointmentValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule) : new Date(),
      reason: appointment ? appointment?.reason : "",
      note: appointment ? appointment?.note : "",
      cancellationReason: appointment ? appointment?.cancellationReason : "",
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }
    try {
      if (type === "create") {
        const appointmentData = {
          userId,
          patientId,
          doctorId: 10086,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
          cancellationReason: values.cancellationReason,
        };
        const addPatientData = {
          doctorId: "1",
          id: patientId,
          name: patientName,
          reason: values.reason,
        };

        const result = await createAppointment(appointmentData, addPatientData);

        if (result) {
          form.reset();
          router.push(
            `/patients/${patientId}/new-appointment/success?appointmentId=${result.appointmentId}`,
          );
        }

        // }else{
        //     const appointmentUpdateData = {
        //         appointmentId: appointment?.id,
        //         type,
        //         doctorId: values?.doctorId,
        //         schedule: new Date(values?.schedule),
        //         status: status as Status,
        //         cancellationReason: values?.cancellationReason,
        //     }
        //     const updatedAppointment = await updateAppointment(appointmentUpdateData)

        //     if (updatedAppointment) {
        //         setOpen && setOpen(false)
        //         form.reset()
        // }
        // }
        // else{
        //     cancelAppointment = {
        //         cancellationReason = values.cancellationReason,
        //         appointmentId = appointment?.id,

        //     }

        //     const result = await cancelAppointment(appointment?.id)
        //     if (result) {
        //         form.reset()
        //         setOpen && setOpen(false)
        //     }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = "预约挂号";
      break;
    case "cancel":
      buttonLabel = "取消预约";
      break;
    case "schedule":
      buttonLabel = "确认预约";
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="space-y-4">
            <h1 className="text-blue-300 font-bold text-2xl">预约挂号</h1>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="选择医生"
              placeholder="请选择医生"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="选择时间"
              placeholder="请选择日期"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />
            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="病情描述"
                placeholder="请描述病情"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="备注"
                placeholder="请添加备注"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="取消原因"
            placeholder="请填写取消原因"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
