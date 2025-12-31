import db from "../models/index.js";

const Category = db.Category;
/* CREATE */
 const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category_image = req.file ? req.file.filename : null;

    const data = await Category.create({ category_name, category_image });

    res.status(200).json({
      status_code: 200,
      status: 0,
      message: "Category created successfully",
      data
    });

  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* UPDATE */ const updateCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category_image = req.file ? req.file.filename : undefined;

    const payload = { category_name };
    if (category_image) payload.category_image = category_image;

    const updated = await Category.update(payload, { where: { id: req.params.id } });

    if (!updated[0]) {
      return res.status(404).json({ status_code: 404, status: 1, message: "Category not found" });
    }

    res.status(200).json({ status_code: 200, status: 0, message: "Category updated successfully" });

  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};


/* DELETE */ const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({
        status_code: 404,
        status: 1,
        message: "Category not found"
      });
    }

    await Category.destroy({ where: { id } });

    res.status(200).json({
      status_code: 200,
      status: 0,
      message: "Category and related subcategories deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      status_code: 500,
      status: 1,
      message: err.message
    });
  }
};




 const getCategoriesWithSub = async (req, res) => {
  try {
    const data = await Category.findAll({
      include: { model: db.SubCategory, as: "subcategories" }
    });

    res.status(200).json({ status_code: 200, status: 0, message: "Fetched", data });

  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

 const getCategories = async (req, res) => {
  try {
    const data = await Category.findAll();

    res.status(200).json({
      status_code: 200,
      status: 0,
      message: "Categories fetched successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* GET CATEGORY BY ID */
 const getCategoryById = async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({
        status_code: 404,
        status: 1,
        message: "Category not found"
      });
    }

    res.status(200).json({
      status_code: 200,
      status: 0,
      message: "Category fetched successfully",
      data
    });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};


export default {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategories,
    getCategoriesWithSub
};  