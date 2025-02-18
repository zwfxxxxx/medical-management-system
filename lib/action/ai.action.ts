import { API } from "./API";

export const aiChat = async (message: any) => {
    try {
        const response = await API.post('/generate', { message });
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }

}