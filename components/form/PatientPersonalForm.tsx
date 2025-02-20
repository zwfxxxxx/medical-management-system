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
  IdentificationTypes,
} from "@/constants";

const PatientPersonalForm = ({ userId, patientData }: { userId: string, patientData: any }) => { // 接受患者数据作为属性
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...patientData, // 使用传入的患者数据作为默认值
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    
    try {
      const updatedData = {
        ...values,
        userId,
      };
      
      // const result = await updatePatient(updatedData); // 调用更新患者信息的API
      // if (result && result.status === 200) {
      //   router.push(`/patients/${result.data.patient_id}/view`); // 假设存在查看患者页面
      // } else {
      //   setError("更新患者信息失败");
      //   setIsLoading(false);
      // }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="text-blue-500 font-bold text-2xl">编辑患者信息</h1>
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
        {/* 其他 CustomFormField 继续使用 */}
        
        <SubmitButton isLoading={isLoading}>保存更改</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientPersonalForm;
