"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { createPatient } from "@/lib/action/patient.action";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./LoginForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const PatientRegisterForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData = new FormData();

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.name);
    }

    try {
      const patientData = {
        ...values,
        userId,
        birthDate: new Date(values.birthDate),
      };
      formData?.append("patientData", JSON.stringify(patientData));
      const result = await createPatient(formData);
      if (result && result.status === 200) {
        router.push(`/patients/${result.data.patient_id}/new-appointment`);
      } else {
        setError("创建患者失败");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="text-blue-500 font-bold text-2xl">填写你的详细信息</h1>
        </section>
        <section className="space-y-3">
          <h2>个人信息</h2>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="姓名"
          placeholder="你的姓名"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="邮箱"
            placeholder="邮箱"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="电话"
            placeholder="手机号码"
            iconSrc="/assets/icons/phone.svg"
            iconAlt="phone"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="生日"
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="性别"
            renderSkeleton={(feild) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={feild.onChange}
                  defaultValue={feild.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-300"
                      />
                      <label
                        htmlFor={option}
                        className="cursor-pointer cursor-pointer text-gray-600 hover:text-blue-500"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="家庭住址"
            placeholder="家庭住址"
            iconAlt="address"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="职业"
            placeholder="职业"
            iconAlt="occupation"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="紧急联系人姓名"
            placeholder="紧急联系人姓名"
            iconAlt="emergencyContactName"
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="紧急联系人电话"
            placeholder="紧急联系人电话"
            iconAlt="emergencyContactNumber"
          />
        </div>
        <section className="space-y-3">
          <h2>过往病史</h2>
        </section>
        {/* <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="主治医生"
                >
                    {
                        Doctors.map((doctor) => (
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
                        ))
                    } */}

        {/* </CustomFormField> */}

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="过敏物"
            placeholder="青霉素、雾化咳嗽、酒精中毒等"
            iconAlt="allergies"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="当前用药情况"
            placeholder="布洛芬、阿司匹林等药物"
            iconAlt="currentMedication"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="家族病史"
            placeholder="家族遗传病史、家族肿瘤史等"
            iconAlt="familyMedicalHistory"
          />
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="个人病史"
            placeholder="手术史、糖尿病史等"
            iconAlt="pastMedicalHistory"
          />
        </div>

        <section className="space-y-3">
          <h2>身份信息</h2>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="证件类型"
          placeholder="居民身份证"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="证件号码"
          placeholder="证件号码"
          iconAlt="identificationNumber"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="上传身份证件"
          renderSkeleton={(feild) => (
            <FormControl>
              <FileUploader files={feild.value} onChange={feild.onChange} />
            </FormControl>
          )}
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="我已阅读并同意《服务政策协议》和《隐私权政策》"
        />

        <SubmitButton isLoading={isLoading}>提交</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientRegisterForm;
