import { API } from "./API";

export const doctorLogin = async (doctor: { phone: string; password: string }) => {
    try {
        const response = await API.post('/doctor_login', { doctor }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = response.data;
        
        if (data) {
            return {
                success: true,
                token: data.token,
                doctorId: data.doctorId,
            };
        } else {
            return {
                success: false,
                message: data.message || '登录失败'
            };
        }
    } catch (error) {
        console.error('Doctor login error:', error);
        return {
            success: false,
            message: '登录失败，请重试'
        };
    }
};

export const createDoctor = async (doctor: any) => {
    try{
        const response = await API.post('/add_doctor', {"doctor": doctor}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getDoctorsData = async () => {
    try{
        const response = await API.get('/doctors_info');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const updateDoctor = async (doctor: any) => {
    try{
        const response = await API.put('/modify_doctor', {"doctor": doctor}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteDoctor = async (doctorId: string) => {
    try{
        const response = await API.delete('/del_doctor', {
            params: {
                doctor_id: doctorId
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}