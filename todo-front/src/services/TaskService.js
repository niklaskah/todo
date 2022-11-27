import axios from "axios";
import * as Realm from "realm-web"

const getTasks = async () => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID
    console.log("app id", REALM_APP_ID);
    const app = new Realm.App({id: REALM_APP_ID})
    const credentials = Realm.Credentials.anonymous()
    let tasks = []
    try {
        const user = await app.logIn(credentials)
        tasks = await user.functions.getTasksByUserId()
    } catch (error) {
        console.error(error)
    }
    return tasks
}
const getTasksByUserId = async (user) => {
    // const request = axios.get(`http://[::1]:3000/tasks?filter[where][userId]=${user}`)
    // const response = await request;
    // return response.data;
}
const deleteById = async (id) => {
    // const request = axios.delete(`http://[::1]:3000/tasks/${id}`)
    // const response = await request;
    // return response.data;
}
const TaskService = {
    getTasksByUserId,
    deleteById,
    getTasks
}
export default TaskService