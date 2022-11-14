import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NoteState from './context/notes/NoteState';
import { Alerts } from './components/Alerts';
import { useState } from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';



function App() {
  const [alert, setalert] = useState(false)
  const showAlert = (message, type) => {
    setalert({
      message: message,
      type: type,
  
    })
    setTimeout(() => {
      setalert(false)
    }, 4000);
  }




  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar showAlert={showAlert} />

          <Alerts  alert={alert} showAlert={showAlert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="About/*" element={<About />} />
            <Route path="Login/*" element={<Login showAlert={showAlert}/>} />
            <Route path="Signup/*" element={<Signup showAlert={showAlert} />} />
           
          </Routes>
        </BrowserRouter>

      </NoteState>
    </>

  );
}

export default App;

