import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth/v1", userRoutes);
app.use("/api/v1", (await import("./routes/category.routes.js")).default);
app.use("/api/v1", (await import("./routes/subcategory.routes.js")).default);
app.use(errorMiddleware);

export default app;
