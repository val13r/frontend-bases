import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import './CrearRecursoPanel.css';

const CrearRecursoPanel = () => {
  const userId = useSelector((state) => state.user?.userId) || JSON.parse(localStorage.getItem('userId'));
  const [formData, setFormData] = useState({ ID_Usuario: userId, ID_Area: '', ID_Medio: '', ID_Formato: '', Titulo: '', Descripcion: '', URL_Archivo: '', ID_Categoria: '' });
  const [areas, setAreas] = useState([]);
  const [medios, setMedios] = useState([]);
  const [formatos, setFormatos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get('/categorias/areas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener áreas:', error);
      }
    };

    const fetchMedios = async () => {
      try {
        const response = await api.get('/formatos/medios');
        setMedios(response.data);
      } catch (error) {
        console.error('Error al obtener medios:', error);
      }
    };

    fetchAreas();
    fetchMedios();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      if (formData.ID_Area) {
        try {
          const response = await api.get(`/categorias/categorias/area/${formData.ID_Area}`);
          setCategorias(response.data);
        } catch (error) {
          console.error('Error al obtener categorías:', error);
        }
      } else {
        setCategorias([]);
      }
    };

    fetchCategorias();
  }, [formData.ID_Area]);

  useEffect(() => {
    const fetchFormatos = async () => {
      if (formData.ID_Medio) {
        try {
          const response = await api.get(`/formatos/formatos/medio/${formData.ID_Medio}`);
          setFormatos(response.data);
        } catch (error) {
          console.error('Error al obtener formatos:', error);
        }
      } else {
        setFormatos([]);
      }
    };

    fetchFormatos();
  }, [formData.ID_Medio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithUser = { ...formData, 
      ID_Usuario: Number.parseInt(userId),
      ID_Categoria: Number.parseInt(formData.ID_Categoria),
      ID_Formato: Number.parseInt(formData.ID_Formato),
    };
    try {
      console.log(formDataWithUser);
      await api.post('/recursos/', formDataWithUser);
      alert('Recurso creado con éxito');
    } catch (error) {
      console.error('Error al crear recurso:', error);
      alert('Error al crear recurso');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Creación de Recurso</h3>
      <select name="ID_Area" value={formData.ID_Area} onChange={handleChange} className="form-input styled-input">
        <option value="">Selecciona un Área</option>
        {areas.map((area) => (
          <option key={area.ID_Area} value={area.ID_Area}>{area.Nombre_Area}</option>
        ))}
      </select>
      <select name="ID_Categoria" value={formData.ID_Categoria} onChange={handleChange} className="form-input styled-input">
        <option value="">Selecciona una Categoría</option>
        {categorias.map((categoria) => (
          <option key={categoria.ID_Categoria} value={categoria.ID_Categoria}>{categoria.Nombre_Categoria}</option>
        ))}
      </select>
      <select name="ID_Medio" value={formData.ID_Medio} onChange={handleChange} className="form-input styled-input">
        <option value="">Selecciona un Medio</option>
        {medios.map((medio) => (
          <option key={medio.ID_Medio} value={medio.ID_Medio}>{medio.Nombre}</option>
        ))}
      </select>
      <select name="ID_Formato" value={formData.ID_Formato} onChange={handleChange} className="form-input styled-input">
        <option value="">Selecciona un Formato</option>
        {formatos.map((formato) => (
          <option key={formato.ID_Formato} value={formato.ID_Formato}>{formato.Nombre}</option>
        ))}
      </select>
      <input type="text" name="Titulo" placeholder="Título" value={formData.Titulo} onChange={handleChange} className="form-input styled-input" />
      <textarea name="Descripcion" placeholder="Descripción" value={formData.Descripcion} onChange={handleChange} className="form-textarea styled-input"></textarea>
      <input type="text" name="URL_Archivo" placeholder="URL del Archivo" value={formData.URL_Archivo} onChange={handleChange} className="form-input styled-input" />
      <button type="submit" className="form-button styled-button">Crear Recurso</button>
    </form>
  );
};

export default CrearRecursoPanel;
