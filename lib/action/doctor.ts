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


export const getDoctorTreatmentData = async (department: string) => {
    try{
        const response = await API.get('/doctors_treatment_data', {
            params: {
                department: department
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
