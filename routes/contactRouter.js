const Router = require('express');
const router = new Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.create);
router.get('/', contactController.getAll);
router.get('/:id', contactController.getOne);
router.post('/:id', contactController.remove);
router.put('/:id', contactController.update);

module.exports = router;
