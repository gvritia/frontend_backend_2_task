const express = require('express');
const router = express.Router();

const { register, login, refresh, me } = require('../controllers/authController');
const auth = require('../middleware/auth');

/* ===================== SWAGGER ===================== */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Аутентификация и управление аккаунтом
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "user@example.com" }
 *               first_name: { type: string, example: "Иван" }
 *               last_name: { type: string, example: "Иванов" }
 *               password: { type: string, example: "123456" }
 *     responses:
 *       201: { description: "Пользователь успешно зарегистрирован" }
 *       400: { description: "Пользователь уже существует" }
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход в систему
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "admin@example.com" }
 *               password: { type: string, example: "admin123" }
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: string }
 *                 refreshToken: { type: string }
 *       401: { description: "Неверные данные или пользователь заблокирован" }
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Обновление токенов (Refresh Token)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Новая пара токенов
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken: { type: string }
 *                 refreshToken: { type: string }
 *       401: { description: "Refresh токен не предоставлен" }
 *       403: { description: "Неверный или истёкший refresh токен" }
 */
router.post('/refresh', refresh);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Получить информацию о текущем пользователе
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные текущего пользователя
 *       401: { description: "Не авторизован" }
 *       403: { description: "Токен недействителен" }
 */
router.get('/me', auth, me);

module.exports = router;