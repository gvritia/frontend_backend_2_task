import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AddProduct() {
    const [form, setForm] = useState({ title: '', category: '', description: '', price: '' });
    const [loading, setLoading] = useState(false);
    const { api } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/products', form);
            alert('Товар успешно добавлен!');
            navigate('/products');
        } catch (err) {
            alert('Ошибка при добавлении товара');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px' }}>
            <h2>Добавить новый товар</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Название товара" value={form.title} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <input name="category" placeholder="Категория" value={form.category} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px', height: '80px' }} />
                <input name="price" type="number" placeholder="Цена" value={form.price} onChange={handleChange} required style={{ display: 'block', width: '100%', margin: '10px 0', padding: '8px' }} />
                <button type="submit" disabled={loading} style={{ padding: '10px 20px', marginTop: '10px' }}>
                    {loading ? 'Добавление...' : 'Добавить товар'}
                </button>
            </form>
        </div>
    );
}