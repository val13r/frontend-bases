import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './Profile.css';

const Profile = () => {
  const userId = useSelector((state) => state.user.userId) || JSON.parse(localStorage.getItem('userId'));
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/users/${userId}`);
        if (response.data) {
          setUserData(response.data);
        } else {
          console.error('Usuario no encontrado');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <p className="loading">Cargando...</p>;
  }

  if (!userId && !loading) {
    return <p className="not-authenticated">No estás autenticado. Por favor inicia sesión.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-title">Perfil de Usuario</h2>
        {userData ? (
          <div className="profile-details">
            <p><strong>Nombre:</strong> {userData.Nombre}</p>
            <p><strong>Correo Electrónico:</strong> {userData.Correo_Electronico}</p>
            <p><strong>Rol:</strong> {userData.Rol}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(userData.Fecha_Registro).toLocaleDateString()}</p>
          </div>
        ) : (
          <p className="error">Error al cargar los datos del perfil.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
