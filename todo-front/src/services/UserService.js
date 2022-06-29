import axios from "axios";

const login = async (user) => {

    const request = axios.post(`http://[::1]:3000/users/login`, user)
    const response = await request;
    return response.data;
}

const register = async (user) => {

    const request = axios.post(`http://[::1]:3000/users/signup`, user)
    const response = await request;
    return response.data;
}

const checkUserToken = async (token) => {

    const request = axios.get(`http://[::1]:3000/whoAmI`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const response = await request;
    return response.data;
}

const isLoggedIn = async () => {
    if (checkUserToken === "") {
        console.log("userloggedin testi ", false);
        return false
    } else {
        console.log("userloggedin testi ", true);
        return true
    }
}

const logout = () => {
    try {
        localStorage.removeItem("user")
    } catch (error) {
        console.log(error);
    }
}
const UserService = {
    login,
    register,
    checkUserToken,
    logout,
}
export default UserService
export {isLoggedIn}
