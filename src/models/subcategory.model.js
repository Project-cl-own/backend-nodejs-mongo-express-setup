 const subcategoryModel = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("SubCategory", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subcategory_image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: "subcategories",
    timestamps: true
  });

  return SubCategory;
};


export default subcategoryModel;