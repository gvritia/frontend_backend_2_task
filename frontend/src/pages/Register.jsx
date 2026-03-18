import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ email: '', first_name: '', last_name: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await register(form.email, form.first_name, form.last_name, form.password);
            alert('Регистрация успешна! Теперь войдите в систему.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>Регистрация</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <input name="first_name" type="text" placeholder="Имя" value={form.first_name} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <input name="last_name" type="text" placeholder="Фамилия" value={form.last_name} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
                    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
            </form>

            <p style={{ marginTop: '15px' }}>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
}