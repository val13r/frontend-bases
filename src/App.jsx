import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Buscar from './pages/Buscar/Buscar';

const App = () => {
  const PrivateRoute = ({ element }) => {
    const userId = localStorage.getItem('userId');
    return userId ? element : <Login />;
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Buscar/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;