import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { api } = useAuth();   // используем api из контекста (мы его добавим чуть позже)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [api]);

    if (loading) return <p>Загрузка товаров...</p>;

    return (
        <div>
            <h2>Список товаров</h2>
            <Link to="/add-product">
                <button>Добавить новый товар</button>
            </Link>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {products.map(p => (
                    <li key={p.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <strong>{p.title}</strong> — {p.price} руб.
                        <div>
                            <Link to={`/products/${p.id}`}>Подробнее</Link>
                            {' | '}
                            {p.category && <span>Категория: {p.category}</span>}
                        </div>
                    </li>
                ))}
            </ul>

            {products.length === 0 && <p>Товаров пока нет</p>}
        </div>
    );
}