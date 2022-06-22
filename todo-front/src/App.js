import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/Main';
import Navbar from './components/NavBar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='SignIn' element={<SignIn/>}/>
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='Tasks' element={<Tasks/>}/>
      </Routes>
    </div>
  );
}

export default App;
