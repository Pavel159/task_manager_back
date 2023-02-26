const Router = require('express');
const router = new Router();
const todoItemController = require('../controllers/todoItemController');

router.post('/', todoItemController.create);
router.get('/', todoItemController.getAll);
router.get('/new', todoItemController.getNew);
router.get('/inprogress', todoItemController.getInProgress);
router.get('/finished', todoItemController.getFinished);
router.get('/:id', todoItemController.getOne);
router.post('/:id', todoItemController.remove);
router.put('/:id', todoItemController.update);
router.put('/status/:id', todoItemController.changeStatus);
router.put('/finish/:id', todoItemController.finish);

module.exports = router;
