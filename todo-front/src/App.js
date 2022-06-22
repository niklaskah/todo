import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Main from './components/Main';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Testi from './components/Testi';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='SignIn' element={<SignIn/>}/>
        <Route path='SignUp' element={<SignUp/>}/>
        <Route path='Testi' element={<Testi/>}/>
      </Routes>
    </div>
  );
}

export default App;
