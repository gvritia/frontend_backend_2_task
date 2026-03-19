/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Управление товарами
 */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const ctrl = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить список всех товаров
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: "Список товаров" }
 *       401: { description: "Не авторизован" }
 */
router.get('/', auth, role('user'), ctrl.getAll);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар (только Продавец и выше)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, price]
 *             properties:
 *               title: { type: string, example: "Ноутбук Lenovo" }
 *               category: { type: string, example: "Электроника" }
 *               description: { type: string, example: "Мощный игровой ноутбук" }
 *               price: { type: number, example: 75000 }
 *     responses:
 *       201: { description: "Товар создан" }
 *       403: { description: "Недостаточно прав" }
 */
router.post('/', auth, role('seller'), ctrl.create);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: "Товар найден" }
 *       404: { description: "Товар не найден" }
 */
router.get('/:id', auth, role('user'), ctrl.getById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Обновить товар (только Продавец и выше)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               category: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *     responses:
 *       200: { description: "Товар обновлён" }
 */
router.put('/:id', auth, role('seller'), ctrl.update);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар (только Администратор)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: "Товар удалён" }
 *       403: { description: "Недостаточно прав (только admin)" }
 */
router.delete('/:id', auth, role('admin'), ctrl.remove);

module.exports = router;