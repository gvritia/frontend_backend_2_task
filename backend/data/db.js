const bcrypt = require('bcryptjs');

let users = [
    {
        id: 1,
        email: 'admin@example.com',
        first_name: 'Admin',
        last_name: 'Admin',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        isBlocked: false
    },
    {
        id: 2,
        email: 'seller@example.com',
        first_name: 'Seller',
        last_name: 'Seller',
        password: bcrypt.hashSync('seller123', 10),
        role: 'seller',
        isBlocked: false
    }
];

let products = [];
let refreshTokens = new Map(); // refreshToken → userId

module.exports = { users, products, refreshTokens };