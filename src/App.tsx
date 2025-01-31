import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Dumbbell } from 'lucide-react';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Dumbbell className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route 
          path="/dashboard" 
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.email === 'fantacoaching@gmail.com' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;