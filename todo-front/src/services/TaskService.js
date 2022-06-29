import axios from "axios";

const getTasksByUserId = (user) => {
    const request = axios.get(`http://[::1]:3000/tasks?filter[where][userId]=${user}`)
    return request.then(response => response.data)
}



export default {
    getTasksByUserId
}