"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation"; // 不再需要UserFormValidation
// import { updatePatient } from "@/lib/action/patient.action"; // 假设还需要一个更新患者信息的函数
import { useRouter } from "next/navigation";
import { FormFieldType } from "./LoginForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  GenderOptions,
} from "@/constants";
import { updatePatient } from "@/lib/action/patient.action";

const PatientPersonalForm = ({ patientData }: { patientData: any }) => { // 接受患者数据作为属性
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      name: patientData.name,
      email: patientData.email,
      phone: patientData.phone,
      birthDate: patientData.birthDate,
      gender: patientData.gender,
      address: patientData.address,
      occupation: patientData.occupation,
      emergencyContactNumber: patientData.emergencyContactNumber,
      emergencyContactName: patientData.emergencyContactName,
      allergies: patientData.allergies,
      currentMedication: patientData.currentMedication,
      familyMedicalHistory: patientData.familyMedicalHistory,
      pastMedicalHistory: patientData.pastMedicalHistory,
      identificationType: patientData.identificationType,
      identificationNumber: patientData.identificationNumber,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    try {
      const updatedData = {
        id: patientData.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: values.birthDate,
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactNumber: values.emergencyContactNumber,
        emergencyContactName: values.emergencyContactName,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
      };
      const result = await updatePatient(updatedData); // 调用更新患者信息的API
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log(errors);
      })} className="space-y-6 flex-1">

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
          fieldType={FormFieldType.INPUT}
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
          fieldType={FormFieldType.INPUT}
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

      <SubmitButton isLoading={isLoading}>保存更改</SubmitButton>
    </form>
    </Form >
  );
};

export default PatientPersonalForm;
