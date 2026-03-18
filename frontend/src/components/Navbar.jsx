import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to="/products" style={{ color: 'white', marginRight: '1rem' }}>Товары</Link>
                {user?.role === 'admin' && <Link to="/admin/users" style={{ color: 'white', marginRight: '1rem' }}>Пользователи</Link>}
                {['seller', 'admin'].includes(user?.role) && <Link to="/add-product" style={{ color: 'white' }}>Добавить товар</Link>}
            </div>
            <div>
                {user ? (
                    <>
            <span style={{ marginRight: '1rem' }}>
              {user.first_name} ({user.role})
            </span>
                        <button onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login" style={{ color: 'white' }}>Войти</Link>
                )}
            </div>
        </nav>
    );
}