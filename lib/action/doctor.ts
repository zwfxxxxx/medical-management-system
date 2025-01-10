import { API } from "./API";

export const doctorLogin = async (doctor: LoginUserParams) => {
    try{
        const response = await API.post('/doctor_login', {"doctor": doctor}, {
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