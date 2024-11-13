import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuscarRecursosPanel from '../../components/BuscarRecursosPanel/BuscarRecursosPanel';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import './Buscar.css';

const Buscar = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  if (!userId) {
    navigate('/login');
    return null;
  }

  return (
    <div className="home-container">
      <Navbar />
      <h1 className="home-title">Plataforma de Recursos Educativos</h1>
      <div className="panel-container">
        <BuscarRecursosPanel />
      </div>
    </div>
  );
};

export default Buscar;