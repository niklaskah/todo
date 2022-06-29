import axios from "axios";

const login = (user) => {

    const request = axios.post(`http://[::1]:3000/users/login`, user)
    return request.then(response => response.data)
}

const register = (user) => {

    const request = axios.post(`http://[::1]:3000/users/signup`, user)
    return request.then(response => response.data)
}

const checkUserToken = (token) => {

    const request = axios.get(`http://[::1]:3000/whoAmI`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return request.then(response => response.data)
}

const logout = () => {
    try {
        localStorage.removeItem("user")
    } catch (error) {
        console.log(error);
    }
}

export default {
    login,
    register,
    checkUserToken,
    logout
}