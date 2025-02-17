import { API } from './API'

export const getDoctorsByDepartment = async(departmentId: string) => {
    try {
        const response = await API.get(`/department_doctors`, {
            params: {
                departmentId
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
} 