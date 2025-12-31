import db from "../models/index.js";
const SubCategory = db.SubCategory;
const Category = db.Category;


/* CREATE */
const createSubCategory = async (req, res) => {
  try {
    const { category_id, subcategory_name } = req.body;
    const subcategory_image = req.file ? req.file.filename : null;

    const exists = await Category.findByPk(category_id);
    if (!exists) {
      return res
        .status(400)
        .json({ status_code: 400, status: 1, message: "Invalid category_id" });
    }

    const data = await SubCategory.create({
      category_id,
      subcategory_name,
      subcategory_image,
    });

    res
      .status(200)
      .json({
        status_code: 200,
        status: 0,
        message: "SubCategory created",
        data,
      });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* GET ALL */
const getSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.findAll({ include: ["category"] });

    res
      .status(200)
      .json({
        status_code: 200,
        status: 0,
        message: "SubCategories fetched",
        data,
      });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* GET BY CATEGORY */
const getSubCategoriesByCategory = async (req, res) => {
  try {
    const data = await SubCategory.findAll({
      where: { category_id: req.params.category_id },
    });

    res
      .status(200)
      .json({
        status_code: 200,
        status: 0,
        message: "SubCategories fetched",
        data,
      });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* UPDATE */
const updateSubCategory = async (req, res) => {
  try {
    const payload = { subcategory_name: req.body.subcategory_name };
    if (req.file) payload.subcategory_image = req.file.filename;

    const updated = await SubCategory.update(payload, {
      where: { id: req.params.id },
    });

    if (!updated[0]) {
      return res
        .status(404)
        .json({
          status_code: 404,
          status: 1,
          message: "SubCategory not found",
        });
    }

    res
      .status(200)
      .json({ status_code: 200, status: 0, message: "SubCategory updated" });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

/* DELETE */
const deleteSubCategory = async (req, res) => {
  try {
    const deleted = await SubCategory.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res
        .status(404)
        .json({
          status_code: 404,
          status: 1,
          message: "SubCategory not found",
        });
    }

    res
      .status(200)
      .json({ status_code: 200, status: 0, message: "SubCategory deleted" });
  } catch (err) {
    res.status(500).json({ status_code: 500, status: 1, message: err.message });
  }
};

export default {
  createSubCategory,
  getSubCategories,
  getSubCategoriesByCategory,
  updateSubCategory,
  deleteSubCategory,
};
