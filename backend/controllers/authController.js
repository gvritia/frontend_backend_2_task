const bcrypt = require('bcryptjs');
const { users, refreshTokens } = require('../data/db');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const register = (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const hashed = bcrypt.hashSync(password, 10);
    const newUser = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email,
        first_name: first_name || '',
        last_name: last_name || '',
        password: hashed,
        role: 'user',
        isBlocked: false
    };
    users.push(newUser);
    res.status(201).json({ message: 'Регистрация успешна' });
};

const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.password) || user.isBlocked) {
        return res.status(401).json({ message: 'Неверные данные или пользователь заблокирован' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.set(refreshToken, user.id);
    res.json({ accessToken, refreshToken });
};

const refresh = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Нет refresh-токена' });

    const token = authHeader.split(' ')[1];
    if (!refreshTokens.has(token)) return res.status(403).json({ message: 'Неверный refresh-токен' });

    const userId = refreshTokens.get(token);
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(403).json({ message: 'Пользователь не найден' });

    try {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
        refreshTokens.delete(token);
        return res.status(403).json({ message: 'Токен истёк' });
    }

    const newAccess = generateAccessToken(user);
    const newRefresh = generateRefreshToken(user);

    refreshTokens.delete(token);
    refreshTokens.set(newRefresh, user.id);

    res.json({ accessToken: newAccess, refreshToken: newRefresh });
};

const me = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        isBlocked: user.isBlocked
    });
};

module.exports = { register, login, refresh, me };