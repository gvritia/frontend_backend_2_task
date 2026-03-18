const { products } = require('../data/db');

const getAll = (req, res) => res.json(products);
const getById = (req, res) => {
    const p = products.find(x => x.id === +req.params.id);
    p ? res.json(p) : res.status(404).json({ message: 'Товар не найден' });
};
const create = (req, res) => {
    const { title, category, description, price } = req.body;
    const newP = {
        id: products.length ? Math.max(...products.map(x => x.id)) + 1 : 1,
        title, category: category || '', description: description || '', price: +price
    };
    products.push(newP);
    res.status(201).json(newP);
};
const update = (req, res) => {
    const p = products.find(x => x.id === +req.params.id);
    if (!p) return res.status(404).json({ message: 'Не найден' });
    Object.assign(p, req.body);
    res.json(p);
};
const remove = (req, res) => {
    const idx = products.findIndex(x => x.id === +req.params.id);
    if (idx === -1) return res.status(404).json({ message: 'Не найден' });
    products.splice(idx, 1);
    res.json({ message: 'Удалено' });
};

module.exports = { getAll, getById, create, update, remove };