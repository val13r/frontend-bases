import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterPanel from '../../components/RegisterPanel/RegisterPanel';
import CrearRecursoPanel from '../../components/CrearRecursoPanel/CrearRecursoPanel';
import BuscarRecursosPanel from '../../components/BuscarRecursosPanel/BuscarRecursosPanel';
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
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
        <CrearRecursoPanel />
      </div>
    </div>
  );
};

export default Home;