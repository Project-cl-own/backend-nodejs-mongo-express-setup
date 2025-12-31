import express from "express";  
const router = express.Router();
import controller from "../controllers/category.controller.js";
import upload from "../middlewares/upload.js";


router.post("/categories", upload.single("category_image"), controller.createCategory);
router.put("/categories/:id", upload.single("category_image"), controller.updateCategory);

router.get("/categories", controller.getCategories);
router.get("/categories/:id", controller.getCategoryById);
router.delete("/categories/:id", controller.deleteCategory);

export default router;
