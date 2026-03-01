import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TestProvider } from './context/TestContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import Test from './pages/Test';
import Results from './pages/Results';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <TestProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/subjects" element={
                <PrivateRoute>
                  <Subjects />
                </PrivateRoute>
              } />
              <Route path="/test" element={
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              } />
              <Route path="/results" element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </Router>
      </TestProvider>
    </AuthProvider>
  );
}

export default App;
