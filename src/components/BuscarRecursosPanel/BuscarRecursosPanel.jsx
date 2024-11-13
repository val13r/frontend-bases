import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import './BuscarRecursosPanel.css';
import { FaTrashAlt } from 'react-icons/fa';

const BuscarRecursosPanel = () => {
  const [recursos, setRecursos] = useState([]);
  const userId = useSelector((state) => state.user.userId) || localStorage.getItem('userId');

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const response = await api.get('/recursos');
        if (Array.isArray(response.data)) {
          setRecursos(response.data);
        } else {
          setRecursos([]);
        }
      } catch (error) {
        console.error('Error al obtener recursos:', error);
        alert('Error al obtener recursos');
      }
    };

    fetchRecursos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recursos/${id}`);
      setRecursos(recursos.filter((recurso) => recurso.ID_Recurso !== id));
      alert('Recurso eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el recurso:', error);
      alert('Error al eliminar el recurso');
    }
  };

  return (
    <div className="resource-list-container">
      <h2>Lista de Recursos</h2>
      <ul className="resource-list">
        {recursos.length > 0 ? (
          recursos.map((recurso) => (
            <li key={recurso.ID_Recurso} className="resource-item styled-resource-item">
              <div className="resource-container styled-resource-container">
                <div className="resource-info">
                  <strong>{recurso.Titulo}</strong>
                  <p>{recurso.Descripcion}</p>
                  <a
                    href={recurso.URL_Archivo.startsWith('http') ? recurso.URL_Archivo : `http://localhost:5000${recurso.URL_Archivo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resource-link styled-link"
                  >
                    Ver Recurso
                  </a>
                </div>
                {parseInt(userId) === recurso.ID_Usuario && (
                  <button
                    onClick={() => handleDelete(recurso.ID_Recurso)}
                    className="delete-button styled-button delete-btn-icon"
                    title="Eliminar Recurso"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="resource-item styled-resource-item">No hay recursos disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default BuscarRecursosPanel;
