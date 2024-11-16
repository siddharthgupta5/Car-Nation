import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import DashBoard from './components/DashBoard';
import CarForm from './components/CarForm';
import CarDetail from './components/CarDetails';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/car/new"
            element={
              <PrivateRoute>
                <CarForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/car/:id"
            element={
              <PrivateRoute>
                <CarDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/car/edit/:id"
            element={
              <PrivateRoute>
                <CarForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
};

export default App;
