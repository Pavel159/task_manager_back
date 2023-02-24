const Router = require('express');
const router = new Router();
const leadController = require('../controllers/leadController');

router.post('/', leadController.create);
router.get('/', leadController.getAll);
router.get('/:id', leadController.getOne);
router.post('/:id', leadController.remove);
router.put('/:id', leadController.update);

module.exports = router;
