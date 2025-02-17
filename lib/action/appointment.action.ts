import { API } from './API'

export const createAppointment = async (appointment: CreateAppointmentParams) => {
    try {
        const response = await API.post('/create_appointment', { "appointment": appointment, }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAppointment = async (appointmentId: string) => {
    try {
        const response = await API.get('/get_appointment/' + appointmentId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAppointments = async () => {
    try {
        const response = await API.get('/get_appointments/');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getDepartmentAppointments = async (departmentId: string) => {
    try {
        const response = await API.get('/get_department_appointments/' + departmentId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 获取医生的预约列表
export const getDoctorAppointments = async (doctorId: string) => {
    try {
        const response = await API.get(`/doctor/appointments`, {
            params: { doctorId }
        });
        return response.data;
    } catch (error) {
        console.error('获取医生预约列表失败:', error);
        throw error;
    }
};

// 更新预约状态
export const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
        const response = await API.put(`/appointments/${appointmentId}/status`, {
            status
        });
        return response.data;
    } catch (error) {
        console.error('更新预约状态失败:', error);
        throw error;
    }
};