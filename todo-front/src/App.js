import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Home from './components/Home';
import Main from './components/Main';
import Navbar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskDetails from './components/TaskDetails';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='tasks' element={<Tasks/>}/>
        <Route path='tasks/:Id' element={<TaskDetails/>}/>
        <Route path='tasks/edit/:id' element={<EditTask/>}/>
        <Route path='tasks/add' element={<AddTask/>}/>
      </Routes>
    </div>
  );
}

export default App;
