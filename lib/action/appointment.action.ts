import { API } from './API'

export const createAppointment = async (appointment: CreateAppointmentParams, addPatientData: AddpatientQueueParams) => {
    try {
        const response = await API.post('/create_appointment', { "appointment": appointment, "addPatientData": addPatientData }, {
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

export const getAppointments = async (userId: string) => {
    try {
        const response = await API.get('/get_user_appointments/'+userId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAppointment = async (appointment: UpdateAppointmentParams) => {
    try {
        const response = await API.put('/update_appointment', { "appointment": appointment }, {
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

export const cancelAppointment = async (appointmentId: string) => {
    try {
        const response = await API.put('/cancel_appointment/' + appointmentId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};