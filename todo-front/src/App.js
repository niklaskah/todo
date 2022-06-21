import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/Main';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='signin' element={<SignIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
