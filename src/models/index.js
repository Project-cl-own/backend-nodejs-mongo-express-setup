
import Sequelize from "sequelize";
import config from "../config/db.js";
import CategoryModel from "./category.model.js";
import subcategoryModel from "./subcategory.model.js";

const sequelize = config.sequelize;
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Category = CategoryModel(sequelize, Sequelize.DataTypes);
db.SubCategory = subcategoryModel(sequelize, Sequelize.DataTypes);

db.Category.hasMany(db.SubCategory, {
  foreignKey: "category_id",
  as: "subcategories",
  onDelete: "CASCADE",
  hooks: true
});

db.SubCategory.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "category"
});


export default db;