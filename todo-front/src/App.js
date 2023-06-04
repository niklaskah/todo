import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Tasks from './components/Tasks';
import * as Realm from "realm-web";

//open mongodb connection
const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID
const app = new Realm.App({ id: REALM_APP_ID })

function UserIsLoggedIn({ user }) {
  //IF user is found return components that need user prop
  //add conditional for navbar items when user is logged in
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='tasks' element={<Tasks user={user}/>}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='tasks/edit/:id' element={<EditTask user={user}/>}/>
        <Route path='tasks/add' element={<AddTask user={user}/>}/>
      </Routes>
    </div>
  );
}
function App() {
  useEffect(() => {
    // Create a component that lets an anonymous user log in
    const loginAnonymous = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
      console.log("User Logged in");
    }
    user ? console.log("User Found") : loginAnonymous() 

  }, []);
  
  const [user, setUser] = useState(app.currentUser)
  return (
    <div className="App">

      <div className="App-header">
        {user ? <UserIsLoggedIn user={user} /> : <div />}
      </div>
    </div>
  );
}


export default App;
