import { useState, useEffect } from 'react'
import '../App.css'
import HomePage from './HomePage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import Signup from './Signup.jsx';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button.js';
import  init  from '../init.js';



function App() {
  init();
const [isUserAuth, setUserAuth] = useState(!!localStorage.getItem('token'))
const AuthButton = () => {
  return isUserAuth && (<Button className='btn btn-primary' onClick={() => { 
    localStorage.removeItem('token')
    setUserAuth(false)
  }}>{'Выйти'}</Button>);
};
  return (
    <BrowserRouter>
      <div class="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
            <Container>
              <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
              <AuthButton />
            </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUserAuth={setUserAuth} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
