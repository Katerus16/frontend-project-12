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
import { useSelector, useDispatch } from 'react-redux';
import { actions as authUserSlice } from '../slices/authUserSlice.js';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation();
  useEffect(() => {
      init(t);
    }, []);
  const dispatch = useDispatch();
  const showButton = useSelector(state => state.authUser.showButton)
  const AuthButton = () => {
    return showButton && (<Button className='btn btn-primary' onClick={() => { 
      dispatch(authUserSlice.logOutUser());
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
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
