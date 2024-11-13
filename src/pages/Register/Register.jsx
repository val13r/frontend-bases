import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../store/userSlice';
import Navbar from '../../components/Navbar/Navbar';
import './Register.css';
import RegisterPanel from '../../components/RegisterPanel/RegisterPanel';

const Register = () => {
  return (
    <div className="login-container">
      <Navbar />
      <RegisterPanel/>
    </div>
  );
};

export default Register;

