 const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: "categories",
    timestamps: true
  });

  return Category;
};


export default CategoryModel;