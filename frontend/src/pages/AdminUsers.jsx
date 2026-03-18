import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { api } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/users');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [api]);

    const toggleBlock = async (id, currentBlocked) => {
        try {
            await api.put(`/users/${id}`, { isBlocked: !currentBlocked });
            setUsers(users.map(u => u.id === id ? { ...u, isBlocked: !currentBlocked } : u));
            alert('Статус изменён');
        } catch (err) {
            alert('Ошибка');
        }
    };

    if (loading) return <p>Загрузка пользователей...</p>;

    return (
        <div>
            <h2>Управление пользователями (Админ)</h2>
            <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Заблокирован</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name} {user.last_name}</td>
                        <td>{user.role}</td>
                        <td>{user.isBlocked ? 'Да' : 'Нет'}</td>
                        <td>
                            <button onClick={() => toggleBlock(user.id, user.isBlocked)}>
                                {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}