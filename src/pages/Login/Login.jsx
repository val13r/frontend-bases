import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../store/userSlice';
import Navbar from '../../components/Navbar/Navbar';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ Correo_Electronico: '', Contraseña: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', formData);
      const { ID_Usuario } = response.data.usuario;
      dispatch(setUserId(ID_Usuario));
      alert('Inicio de sesión exitoso');
      navigate('/profile');
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <form onSubmit={handleSubmit} className="form-container">
        <h3 className="login-title">Iniciar Sesión</h3>
        <input type="email" name="Correo_Electronico" placeholder="Correo Electrónico" value={formData.Correo_Electronico} onChange={handleChange} className="form-input styled-input" />
        <input type="password" name="Contraseña" placeholder="Contraseña" value={formData.Contraseña} onChange={handleChange} className="form-input styled-input" />
        <button type="submit" className="form-button styled-button">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
