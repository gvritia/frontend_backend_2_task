import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, api } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                alert('Товар не найден');
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, api, navigate]);

    const handleDelete = async () => {
        if (!window.confirm('Удалить товар?')) return;
        try {
            await api.delete(`/products/${id}`);
            alert('Товар удалён');
            navigate('/products');
        } catch (err) {
            alert('Ошибка удаления');
        }
    };

    if (loading) return <p>Загрузка...</p>;
    if (!product) return <p>Товар не найден</p>;

    return (
        <div>
            <h2>{product.title}</h2>
            <p><strong>Категория:</strong> {product.category || '—'}</p>
            <p><strong>Описание:</strong> {product.description || '—'}</p>
            <p><strong>Цена:</strong> {product.price} руб.</p>

            <div style={{ marginTop: '20px' }}>
                <Link to="/products"><button>Назад к списку</button></Link>

                {['seller', 'admin'].includes(user?.role) && (
                    <Link to={`/edit-product/${id}`} style={{ marginLeft: '10px' }}>
                        <button>Редактировать</button>
                    </Link>
                )}

                {user?.role === 'admin' && (
                    <button onClick={handleDelete} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
                        Удалить товар
                    </button>
                )}
            </div>
        </div>
    );
}