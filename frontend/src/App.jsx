import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import ProductsList from './pages/ProductsList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import AdminUsers from './pages/AdminUsers';

const PrivateRoute = ({ children, requiredRole = 'user' }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" />;

  const roleLevels = { user: 1, seller: 2, admin: 3 };
  if (roleLevels[user.role] < roleLevels[requiredRole]) {
    return <Navigate to="/products" />;
  }

  return children;
};

function AppContent() {
  return (
      <>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<PrivateRoute requiredRole="seller"><AddProduct /></PrivateRoute>} />
            <Route path="/edit-product/:id" element={<PrivateRoute requiredRole="seller"><EditProduct /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute requiredRole="admin"><AdminUsers /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
        </div>
      </>
  );
}

export default function App() {
  return (
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
  );
}