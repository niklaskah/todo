import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';
import Logout from './components/Logout';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskDetails from './components/TaskDetails';
import Tasks from './components/Tasks';
import { isLoggedIn } from "./services/UserService"

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [pages, setPages] = useState([])
  useEffect(() => {
    // setLoginStatus(isLoggedIn());
    if (loginStatus) {
      console.log("käyttäjä löytyi")
      setPages(['logout', 'tasks'])
    } else {
      console.log("ei käyttäjää");
      setPages(['signin', 'signup', 'tasks'])
    }
  }, [loginStatus])

  return (
    <div className="App">
      <NavBar pages={pages}/>
      <Routes>
        <Route path='/' element={<Home setLoginStatus={setLoginStatus}/>}/>
        <Route path='signin' element={<SignIn setLoginStatus={setLoginStatus}/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='tasks' element={<Tasks setLoginStatus={setLoginStatus}/>}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='tasks/:Id' element={<TaskDetails/>}/>
        <Route path='tasks/edit/:id' element={<EditTask/>}/>
        <Route path='tasks/add' element={<AddTask/>}/>
      </Routes>
    </div>
  );
}

export default App;
