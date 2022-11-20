import React, { useEffect, useState } from "react"
import { isLoggedIn } from "../services/UserService"
import { useNavigate } from 'react-router-dom';

const Home = ({setLoginStatus}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn()) {
            setLoginStatus(true)
            navigate(`/tasks`,  { replace: true })
        } else {
            navigate(`/signin`,  { replace: true })
            setLoginStatus(false)
        }
      }, [])
    return <div className="App"></div>

}

export default Home