import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const Home = (user) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (user != null) {
            navigate(`/tasks`,  { replace: true })
        } else {
            navigate(`/signin`,  { replace: true })
        }
      }, [])
    return <div className="App"></div>

}

export default Home