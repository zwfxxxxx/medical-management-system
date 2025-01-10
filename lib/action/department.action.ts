import { API } from './API'

export const getDepartments = async() => {
    try {
        const response = await API.get('/departments')
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const createDepartment = async(department: any) => {
    try {
        const response = await API.post('/add_department', {"department": department})
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const updateDepartment = async(department: any) => {
    try {
        const response = await API.put('/modify_department', {"department": department})
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const deleteDepartment = async(department_id: any) => {
    try {
        const response = await API.delete('/del_department', {
            params: {
                department_id: department_id
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}