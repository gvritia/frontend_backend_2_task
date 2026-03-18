const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const ctrl = require('../controllers/productController');

router.get('/', auth, role('user'), ctrl.getAll);
router.post('/', auth, role('seller'), ctrl.create);
router.get('/:id', auth, role('user'), ctrl.getById);
router.put('/:id', auth, role('seller'), ctrl.update);
router.delete('/:id', auth, role('admin'), ctrl.remove);

module.exports = router;