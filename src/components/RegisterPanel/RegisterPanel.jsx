import React, { useState } from 'react';
import api from '../../services/api';
import './RegisterPanel.css';

import { useNavigate } from 'react-router-dom';


const RegisterPanel = () => {
  const [formData, setFormData] = useState({ Nombre: '', Correo_Electronico: '', Contraseña: '', Rol: 'user' });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', formData);
      alert('Usuario registrado con éxito');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Registro de Usuario</h3>
      <input type="text" name="Nombre" placeholder="Nombre" value={formData.Nombre} onChange={handleChange} className="form-input styled-input" />
      <input type="email" name="Correo_Electronico" placeholder="Correo Electrónico" value={formData.Correo_Electronico} onChange={handleChange} className="form-input styled-input" />
      <input type="password" name="Contraseña" placeholder="Contraseña" value={formData.Contraseña} onChange={handleChange} className="form-input styled-input" />
      <select name="Rol" value={formData.Rol} onChange={handleChange} className="form-input styled-input">
        <option value="profesor">Profesor</option>
        <option value="estudiante">Estudiante</option>
      </select>
      <button type="submit" className="form-button styled-button">Registrar</button>
    </form>
  );
};

export default RegisterPanel;
