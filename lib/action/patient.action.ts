import { API } from "./API";

export const userLogin = async (user: LoginUserParams) => {
    try{
        const response = await API.post('/login', {"patient": user}, {
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

export const createUser = async (user: CreateUserParams) => {
    try{
        console.log(user);
        const response = await API.post('/register', {"user": user}, {
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

export const getUser = async (userId: string) => {
    try{
        const response = await API.get('/test/' + userId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createPatient = async (formData: FormData) => {
    try{
        const response = await API.post('/create_patient', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getPatient = async (patientId: string) => {
    try{
        const response = await API.get('/get_patient/' + patientId);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

export const updatePatient = async ( patient: any) => {
    try{
        const response = await API.put('/update_patient', patient, {
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