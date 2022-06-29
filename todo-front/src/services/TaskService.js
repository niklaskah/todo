import axios from "axios";

const getTasksByUserId = async (user) => {
    const request = axios.get(`http://[::1]:3000/tasks?filter[where][userId]=${user}`)
    const response = await request;
    return response.data;
}
const deleteById = async (id) => {
    const request = axios.delete(`http://[::1]:3000/tasks/${id}`)
    const response = await request;
    return response.data;
}
const TaskService = {
    getTasksByUserId,
    deleteById
}
export default TaskService