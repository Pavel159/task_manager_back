const ApiError = require('../error/ApiError');
const { TodoItem } = require('../models/models');

class TodoItemController {
  async create(req, res, next) {
    console.log(req);
    try {
      let { title, priority, description, userId } = req.body;
      const todoItem = await TodoItem.create({
        title,
        priority,
        description,
        status: 'New',
        userId,
        finished: false,
      });
      return res.json(todoItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { userId } = req.query;
    let todos;
    if (userId) {
      todos = await TodoItem.findAndCountAll({
        where: { userId, finished: false },
      });
    } else {
      todos = await TodoItem.findAndCountAll();
    }
    return res.json(todos);
  }

  async getNew(req, res) {
    let { userId } = req.query;
    let todos;
    if (userId) {
      todos = await TodoItem.findAndCountAll({
        where: { userId, status: 'New' },
      });
    } else {
      todos = await TodoItem.findAndCountAll();
    }
    return res.json(todos);
  }

  async getInProgress(req, res) {
    let { userId } = req.query;
    let todos;
    if (userId) {
      todos = await TodoItem.findAndCountAll({
        where: { userId, status: 'In progress' },
      });
    } else {
      todos = await TodoItem.findAndCountAll();
    }
    return res.json(todos);
  }

  async getFinished(req, res) {
    let { userId } = req.query;
    let todos;
    if (userId) {
      todos = await TodoItem.findAndCountAll({
        where: { userId, finished: true },
      });
    } else {
      todos = await TodoItem.findAndCountAll();
    }
    return res.json(todos);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const todo = await TodoItem.findOne({
      where: { id },
    });
    return res.json(todo);
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await TodoItem.destroy({
        where: { id },
      });
      res.status(200).send('Deleted');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res) {
    try {
      let { id, title, priority, description, status, date } = req.body;
      // const { id } = req.params;
      const updatedTodo = await TodoItem.update(
        {
          title,
          priority,
          description,
          status,
          date,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.json(updatedTodo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async changeStatus(req, res) {
    try {
      let { id, status } = req.body;
      // const { id } = req.params;
      const updatedTodo = await TodoItem.update(
        {
          status,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.json(updatedTodo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async finish(req, res) {
    try {
      // let { id } = req.body;
      const { id } = req.params;
      const updatedTodo = await TodoItem.update(
        {
          finished: true,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.json(updatedTodo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TodoItemController();
