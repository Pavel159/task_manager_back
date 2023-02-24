const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const TodoItem = sequelize.define('todo_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, unique: true },
  priority: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  date: { type: DataTypes.STRING },
  finished: { type: DataTypes.BOOLEAN },
});

// const WorkArea = sequelize.define('work_area', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// const Lead = sequelize.define('lead', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING },
//   name: { type: DataTypes.STRING },
//   phone: { type: DataTypes.STRING },
//   messeger: { type: DataTypes.STRING },
//   info: { type: DataTypes.STRING },
//   date: { type: DataTypes.STRING },
// });

// const LeadInfo = sequelize.define('lead_info', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING, allowNull: false },
//   description: { type: DataTypes.STRING, allowNull: false },
// });

// const Contact = sequelize.define('contact', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING },
//   phone: { type: DataTypes.STRING },
//   messeger: { type: DataTypes.STRING },
//   info: { type: DataTypes.STRING },
//   date: { type: DataTypes.STRING },
// });

// const CurrentDeal = sequelize.define('current_deal', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING },
//   name: { type: DataTypes.STRING },
//   phone: { type: DataTypes.STRING },
//   messeger: { type: DataTypes.STRING },
//   info: { type: DataTypes.STRING },
//   date: { type: DataTypes.STRING },
//   totalAmount: { type: DataTypes.INTEGER },
//   income: { type: DataTypes.INTEGER },
//   expenses: { type: DataTypes.INTEGER },
// });

// const PreviousDeal = sequelize.define('previous_deal', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING },
//   name: { type: DataTypes.STRING },
//   phone: { type: DataTypes.STRING },
//   messeger: { type: DataTypes.STRING },
//   info: { type: DataTypes.STRING },
//   date: { type: DataTypes.STRING },
//   totalAmount: { type: DataTypes.INTEGER },
//   income: { type: DataTypes.INTEGER },
//   expenses: { type: DataTypes.INTEGER },
// });

User.hasMany(TodoItem);
TodoItem.belongsTo(User);

// Lead.hasOne(LeadInfo, { as: 'singleInfo' });
// LeadInfo.belongsTo(Lead);

// User.hasMany(Contact);
// Contact.belongsTo(User);

// User.hasMany(CurrentDeal);
// CurrentDeal.belongsTo(User);

// User.hasMany(PreviousDeal);
// PreviousDeal.belongsTo(User);

// Contact.hasMany(CurrentDeal);
// CurrentDeal.belongsTo(Contact);

// Contact.hasMany(PreviousDeal);
// PreviousDeal.belongsTo(Contact);

module.exports = {
  User,
  TodoItem,
};
