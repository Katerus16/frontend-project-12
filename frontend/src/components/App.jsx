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
  const [count, setCount] = useState(0)
  init();

  return (
    <BrowserRouter>
      <div class="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
            <Container>
              <Navbar.Brand href='/'>Hexlet Chat</Navbar.Brand>
              <Button className='btn btn-primary' onClick=''>{'Выйти'}</Button>
            </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
