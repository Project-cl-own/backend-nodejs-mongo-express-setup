import express from "express";
const router = express.Router();
import controller from "../controllers/subcategory.controller.js";
import upload from "../middlewares/upload.js";

router.post("/subcategories", upload.single("subcategory_image"), controller.createSubCategory);
router.get("/subcategories", controller.getSubCategories);
router.get("/subcategories/category/:category_id", controller.getSubCategoriesByCategory);
router.put("/subcategories/:id", upload.single("subcategory_image"), controller.updateSubCategory);
router.delete("/subcategories/:id", controller.deleteSubCategory);

export default router;
