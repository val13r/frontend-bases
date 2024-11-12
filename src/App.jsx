// Frontend Implementation
// 1. Panel de creación de usuarios, login, register, profile
// 2. Panel de creación de recursos
// 3. Panel de búsqueda de recursos
// 4. Panel de reproducción de recursos

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Panel de Registro de Usuarios
export const RegisterPanel = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', contraseña: '', rol: 'user' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', formData);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Registro de Usuario</h3>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="form-input styled-input" />
      <input type="email" name="correo" placeholder="Correo Electrónico" value={formData.correo} onChange={handleChange} className="form-input styled-input" />
      <input type="password" name="contraseña" placeholder="Contraseña" value={formData.contraseña} onChange={handleChange} className="form-input styled-input" />
      <button type="submit" className="form-button styled-button">Registrar</button>
    </form>
  );
};

// Panel de Creación de Recursos
export const CrearRecursoPanel = () => {
  const [formData, setFormData] = useState({ ID_Formato: '', Titulo: '', Descripcion: '', URL_Archivo: '', ID_Categoria: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/recursos', formData);
      alert('Recurso creado con éxito');
    } catch (error) {
      console.error(error);
      alert('Error al crear recurso');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Creación de Recurso</h3>
      <input type="text" name="ID_Formato" placeholder="ID del Formato" value={formData.ID_Formato} onChange={handleChange} className="form-input styled-input" />
      <input type="text" name="Titulo" placeholder="Título" value={formData.Titulo} onChange={handleChange} className="form-input styled-input" />
      <textarea name="Descripcion" placeholder="Descripción" value={formData.Descripcion} onChange={handleChange} className="form-textarea styled-input"></textarea>
      <input type="text" name="URL_Archivo" placeholder="URL del Archivo" value={formData.URL_Archivo} onChange={handleChange} className="form-input styled-input" />
      <input type="text" name="ID_Categoria" placeholder="ID de Categoría" value={formData.ID_Categoria} onChange={handleChange} className="form-input styled-input" />
      <button type="submit" className="form-button styled-button">Crear Recurso</button>
    </form>
  );
};

// Panel de Búsqueda de Recursos
export const BuscarRecursosPanel = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recursos');
        if (Array.isArray(response.data)) {
          setRecursos(response.data);
        } else {
          setRecursos([]);
        }
      } catch (error) {
        console.error(error);
        alert('Error al obtener recursos');
      }
    };

    fetchRecursos();
  }, []);

  return (
    <div className="resource-list-container">
      <h2>Lista de Recursos</h2>
      <ul className="resource-list">
        {recursos.length > 0 ? (
          recursos.map((recurso) => (
            <li key={recurso.ID_Recurso} className="resource-item styled-resource-item">
              <strong>{recurso.Titulo}</strong>
              <p>{recurso.Descripcion}</p>
              <a href={`http://localhost:5000${recurso.URL_Archivo}`} target="_blank" rel="noopener noreferrer" className="resource-link styled-link">
                Ver Recurso
              </a>
            </li>
          ))
        ) : (
          <li className="resource-item styled-resource-item">No hay recursos disponibles</li>
        )}
      </ul>
    </div>
  );
};

// Panel de Reproducción de Recursos
export const ReproduccionRecursosPanel = ({ recurso }) => {
  return (
    <div className="reproduction-container">
      <h2>{recurso.Titulo}</h2>
      <p>{recurso.Descripcion}</p>
      <a href={`http://localhost:5000${recurso.URL_Archivo}`} target="_blank" rel="noopener noreferrer" className="reproduction-link styled-link">
        Reproducir Recurso
      </a>
    </div>
  );
};

// Componente principal
const App = () => {
  return (
    <div className="app-container" style={{ backgroundColor: '#f0f2f5', padding: '40px', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontFamily: 'Arial, sans-serif' }}>Plataforma de Recursos Educativos</h1>
      <div className="panel-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <RegisterPanel />
        <CrearRecursoPanel />
        <BuscarRecursosPanel />
      </div>
    </div>
  );
};

export default App;