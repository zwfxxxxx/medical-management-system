import { z } from "zod";

export const UserFormValidation = z.object({
    phone: z.string().refine((Phone) => /^\+86\d{11}$/.test(Phone) || /^86\d{11}$/.test(Phone) || /^1\d{10}$/.test(Phone), "请输入正确的手机号码"),
    password: z.string().min(6, "密码必须至少6个字符").max(50, "密码不能超过50个字符"),
})


export const UserRegisterFormValidation = z.object({
    name: z.string().min(2, "必须至少2个字符").max(50, "不能超过50个字符"),
    email: z.string().email("请输入正确的邮箱格式"),
    phone: z.string().refine((Phone) => /^\+86\d{11}$/.test(Phone) || /^86\d{11}$/.test(Phone) || /^1\d{10}$/.test(Phone), "请输入正确的手机号码"),
    password: z.string().min(6, "密码必须至少6个字符").max(50, "密码不能超过50个字符"),
    birthDate: z.coerce.date(),
    gender: z.enum(["男", "女"]),
    address: z
        .string()
        .min(2, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),
    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(500, "Occupation must be at most 500 characters"),
        identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
})

export const PatientFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((Phone) => /^\+86\d{11}$/.test(Phone) || /^86\d{11}$/.test(Phone) || /^1\d{10}$/.test(Phone), "请输入正确的手机号码"),
    birthDate: z.coerce.date(),
    gender: z.enum(["男", "女"]),
    address: z
        .string()
        .min(2, "Address must be at least 5 characters")
        .max(500, "Address must be at most 500 characters"),
    occupation: z
        .string()
        .min(2, "Occupation must be at least 2 characters")
        .max(500, "Occupation must be at most 500 characters"),
    emergencyContactName: z
        .string()
        .min(2, "Contact name must be at least 2 characters")
        .max(50, "Contact name must be at most 50 characters"),
    emergencyContactNumber:
        z.string().refine((emergencyContactNumber) => /^\+86\d{11}$/.test(emergencyContactNumber) || /^86\d{11}$/.test(emergencyContactNumber) || /^1\d{10}$/.test(emergencyContactNumber), "请输入正确的手机号码"),
    // primaryPhysician: z.string().min(2, "Select at least one doctor"),
    // insuranceProvider: z
    //     .string()
    //     .min(2, "Insurance name must be at least 2 characters")
    //     .max(50, "Insurance name must be at most 50 characters"),
    // insurancePolicyNumber: z
    //     .string()
    //     .min(2, "Policy number must be at least 2 characters")
    //     .max(50, "Policy number must be at most 50 characters"),
    allergies: z.string().optional(),
    currentMedication: z.string().optional(),
    familyMedicalHistory: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    identificationType: z.string().optional(),
    identificationNumber: z.string().optional(),
    identificationDocument: z.custom<File[]>().optional(),
    // treatmentConsent: z
    //     .boolean()
    //     .default(false)
    //     .refine((value) => value === true, {
    //         message: "You must consent to treatment in order to proceed",
    //     }),
    // disclosureConsent: z
    //     .boolean()
    //     .default(false)
    //     .refine((value) => value === true, {
    //         message: "You must consent to disclosure in order to proceed",
    //     }),
    privacyConsent: z
        .boolean()
        .default(false)
        .refine((value) => value === true, {
            message: "You must consent to privacy in order to proceed",
        }),
});

export const DoctorFormValidation = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["男", "女"]),
    departmentId: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    qualification: z
        .string()
        .min(2, "Qualification must be at least 2 characters")
        .max(500, "Qualification must be at most 500 characters"),
    availability: z.string().optional(),
    profile_picture: z.string().optional(),
    position: z.string().optional(),
    biography: z.string().optional(),
    status: z.string().optional()
});

export const DepartmentFormValidation = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    managementDoctor: z.string().optional(),
});

export const CreateAppointmentSchema = z.object({
    departmentId: z.string().optional(),
    doctorId: z.string().optional(),
    schedule: z.coerce.date(),
    reason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
    departmentId: z.string().optional(),
    doctorId: z.string().optional(),

    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
    departmentId: z.string().optional(),

    doctorId: z.string().optional(),
    schedule: z.coerce.date(),
    reason: z.string().optional(),
    note: z.string().optional(),
    cancellationReason: z
        .string()
        .min(2, "Reason must be at least 2 characters")
        .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
    switch (type) {
        case "create":
            return CreateAppointmentSchema;
        case "cancel":
            return CancelAppointmentSchema;
        default:
            return ScheduleAppointmentSchema;
    }
}