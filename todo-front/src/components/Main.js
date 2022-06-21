import React from "react"
import {Routes, Route} from 'react-router-dom'
import Home from "./Home"
import SignIn from "./SignIn"



const Main = () => {
<main>
<Routes>
    <Route exact path="/" component={Home}/>
    <Route exact path="/signin" component={SignIn}/>
</Routes>
</main>
}

export default Main