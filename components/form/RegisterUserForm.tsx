"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomForm";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserRegisterFormValidation } from "@/lib/validation";
import { createUser, userLogin } from "@/lib/action/patient.action";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderOptions, IdentificationTypes } from "@/constants";
import { SelectItem } from "@/components/ui/select";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const RegisterUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof UserRegisterFormValidation>>({
    resolver: zodResolver(UserRegisterFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      birthDate: new Date(),
      gender: "男" as "男" | "女",
      occupation: "",
      address: "",
      identificationType: undefined,
      identificationNumber: undefined
    },
  });

  async function onSubmit(form: z.infer<typeof UserRegisterFormValidation>) {
    setIsLoading(true);
    setErrorMessage(""); // Reset error message on form submission

    try {
      const user = {...form};
      const userData = await createUser(user);
      if (userData) router.push(`/`);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // Example: if the error is due to user already existing
          setErrorMessage(data.message || "注册失败，用户已存在！");
        } else {
          setErrorMessage("服务器错误，请稍后再试！");
        }
      } else {
        setErrorMessage("网络错误，请检查连接！");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-4">
          <h1 className="text-blue-300 font-extrabold text-3xl">注册账号</h1>
          {errorMessage && (
            <div className="text-red-500 text-sm">
              <p>{errorMessage}</p>
            </div>
          )}
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label=""
          placeholder="你的姓名"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="你的密码"
          iconSrc="/assets/icons/password.svg"
          iconAlt="user"
        />
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
        <SubmitButton isLoading={isLoading}>注册</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterUserForm;
