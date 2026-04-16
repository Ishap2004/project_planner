import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// DEMO HIGHLIGHT: This is our custom PrivateRoute component.
// It checks if a user is logged in. If they are, it shows the page (children).
// If not, it redirects them back to the login page to keep our app secure.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading Application...</div>;

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {/* DEMO HIGHLIGHT: Here is where we define our React routes. */}
        {/* Notice how the Dashboard is protected by placing it inside our PrivateRoute tag. */}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
