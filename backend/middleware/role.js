const roleMiddleware = (minRole) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Необходима аутентификация' });

    const levels = { user: 1, seller: 2, admin: 3 };
    if (levels[req.user.role] >= levels[minRole]) {
        next();
    } else {
        res.status(403).json({ message: 'Недостаточно прав' });
    }
};

module.exports = roleMiddleware;