import { API } from "./API"

export const createReport = async (report: any) => {
    try {
        const response = await API.post('/create_report', {"report": report});
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateReoprt = async (report: any) => {
    try {
        const response = await API.put('/update_report', {"report": report});
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getReport = async (appointmentId: string) => {
    try {
        const response = await API.get('/get_report/' + appointmentId);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
        }
}