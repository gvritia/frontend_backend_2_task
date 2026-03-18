import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Добавляем api в контекст
    const value = {
        user,
        loading,
        api,           // ← вот это было нужно
        login: async (email, password) => {
            const res = await api.post('/auth/login', { email, password });
            const { accessToken, refreshToken } = res.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            const userRes = await api.get('/auth/me');
            setUser(userRes.data);
        },

        register: async (email, first_name, last_name, password) => {
            await api.post('/auth/register', { email, first_name, last_name, password });
        },

        logout: () => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
        }
    };

    // Проверка токена при старте
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/auth/me')
                .then(res => setUser(res.data))
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);