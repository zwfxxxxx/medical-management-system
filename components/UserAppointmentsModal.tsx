'use client'

import { Button } from "./ui/button";

const UserAppointmentsModal = ({
    type,
    userAppointment
}: {
    type: "scheduled" | "pending" | "completed";
    userAppointment?: any
}) => {

    const handleDownloadReport = async () => {
        if (type === 'completed') {
            try {
                // 构造请求数据，根据 userAppointment 提取 patient_info 和 appointment_id
                const requestData = {
                    patient_info: {
                        name: userAppointment.patientName || "",
                        age: userAppointment.patientAge || "",
                        gender: userAppointment.patientGender || "",
                        department: userAppointment.departmentName || "",
                        schedule: userAppointment.schedule || "",
                        id: userAppointment.id || ""
                    },  // 根据实际结构调整字段
                };
                const response = await fetch("http://localhost:5000/create_report", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error("网络响应错误");
                }

                // 将返回的数据解析为 Blob
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "medical_report.pdf"; // 下载时的文件名
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error("下载报告失败：", error);
                alert("下载报告失败，请稍后重试。");
            }
        } else {
            alert("请等待医生诊断");
        }
    };

    return (
        <Button
            variant="ghost"
            className={`capitalize ${type === 'completed' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={handleDownloadReport}
            disabled={type !== 'completed'}
        >
            下载报告
        </Button>
    );
};

export default UserAppointmentsModal;
