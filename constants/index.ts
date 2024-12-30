export const GenderOptions = ["男", "女"];

export const PatientFormDefaultValues = {
    name: "",
    // lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "男" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    // insuranceProvider: "",
    // insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "居民身份证",
    identificationNumber: "",
    identificationDocument: [],
    privacyConsent:false
    // treatmentConsent: false,
    // disclosureConsent: false,
    // privacyConsent: false,
};

export const IdentificationTypes = [
    "居民身份证",
    "护照",
    "港澳居民来往内地通行证",
    "台湾居民来往大陆通行证",
    "外国人永久居留身份证",
];

export const Doctors = [
    {
        image: "/assets/images/dr-green.png",
        name: "John Green",
        doctorId: 10086,
        department: "内科(A401)",
        // 
    },
    {
        image: "/assets/images/dr-cameron.png",
        name: "Leila Cameron",
        doctorId: 10087,
        department: "外科(A402)",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "David Livingston",
        doctorId: 10088,
        department: "儿科(A403)",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Evan Peter",
        doctorId: 10089,        
        department: "妇产科(A404)",
    },
    {
        image: "/assets/images/dr-powell.png",
        name: "Jane Powell",
        doctorId: 10090,
        department: "口腔科(A405)",
    },
    {
        image: "/assets/images/dr-remirez.png",
        name: "Alex Ramirez",
        doctorId: 10091,
        department: "耳鼻喉科(A406)",
    },
    {
        image: "/assets/images/dr-lee.png",
        name: "Jasmine Lee",
        doctorId: 10092,
        department: "肿瘤科(A407)",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Alyana Cruz",
        doctorId: 10093,
        department: "消化内科(A408)",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Hardik Sharma",
        doctorId: 10094,
        department: "神经内科(B409)",
    },
];

export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
};