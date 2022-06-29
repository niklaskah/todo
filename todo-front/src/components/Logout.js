import React, { useEffect, useState } from "react"
import userService from "../services/UserService"

const Logout = () => {

    userService.logout()

    return <div >Kirjauduit ulos</div>

}

export default Logout