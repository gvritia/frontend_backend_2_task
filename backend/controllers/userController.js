const { users } = require('../data/db');
const bcrypt = require('bcryptjs');

const getAll = (req, res) => {
    res.json(users.map(({ password, ...u }) => u));
};

const update = (req, res) => {
    const user = users.find(u => u.id === +req.params.id);
    if (!user) return res.status(404).json({ message: 'Не найден' });
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10);
    Object.assign(user, req.body);
    res.json({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role, isBlocked: user.isBlocked });
};

const remove = (req, res) => {
    const idx = users.findIndex(u => u.id === +req.params.id);
    if (idx === -1 || users[idx].id === 1) return res.status(403).json({ message: 'Нельзя удалить главного админа' });
    users.splice(idx, 1);
    res.json({ message: 'Удалён' });
};

module.exports = { getAll, update, remove };