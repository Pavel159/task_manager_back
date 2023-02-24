const ApiError = require('../error/ApiError');
const { Lead, LeadInfo } = require('../models/models');

class LeadController {
  async create(req, res, next) {
    console.log(req);
    try {
      let { title, name, phone, messeger, info, date, singleInfo, userId } =
        req.body;
      const lead = await Lead.create({
        title,
        name,
        phone,
        messeger,
        info,
        date,
        userId,
      });
      if (singleInfo) {
        singleInfo = JSON.parse(singleInfo);
        singleInfo.forEach((i) =>
          LeadInfo.create({
            title: i.title,
            description: i.description,
            leadId: lead.id,
          })
        );
      }
      return res.json(lead);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    let { limit, page, userId } = req.query;
    // let { userId } = req.header;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;
    let leads;
    if (userId) {
      leads = await Lead.findAndCountAll({ where: { userId }, limit, offset });
    } else {
      leads = await Lead.findAndCountAll({ limit, offset });
    }
    return res.json(leads);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const lead = await Lead.findOne({
      where: { id },
      include: [{ model: LeadInfo, as: 'singleInfo' }],
    });
    return res.json(lead);
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await Lead.destroy({
        where: { id },
      });
      res.status(200).send('Deleted');
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res) {
    try {
      let { id, title, name, phone, messeger, info, date } = req.body;
      // const { id } = req.params;
      const updatedLead = await Lead.update(
        {
          title,
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
      return res.json(updatedLead);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new LeadController();
