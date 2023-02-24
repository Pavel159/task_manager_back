const ApiError = require('../error/ApiError');
const { Contact } = require('../models/models');

class ContactController {
  async create(req, res, next) {
    console.log(req);
    try {
      let { name, phone, messeger, info, date, userId } = req.body;
      const contact = await Contact.create({
        name,
        phone,
        messeger,
        info,
        date,
        userId,
      });
      return res.json(contact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page, userId } = req.query;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;
    let contacts;
    if (userId) {
      contacts = await Contact.findAndCountAll({
        where: { userId },
        limit,
        offset,
      });
    } else {
      contacts = await Contact.findAndCountAll({ limit, offset });
    }
    return res.json(contacts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const contact = await Contact.findOne({
      where: { id },
    });
    return res.json(contact);
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await Contact.destroy({
        where: { id },
      });
      res.status(200).send('Deleted');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res) {
    try {
      let { id, name, phone, messeger, info, date } = req.body;
      const updatedContact = await Contact.update(
        {
          name,
          phone,
          messeger,
          info,
          date,
        },
        {
          where: { id },
          returning: true,
        }
      );
      return res.json(updatedContact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ContactController();
