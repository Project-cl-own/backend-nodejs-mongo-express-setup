import app from "./app.js";
import db from "./models/index.js";
import dotenv from "dotenv";
dotenv.config();
const DB_PORT = process.env.DB_PORT || 5000;


db.sequelize.authenticate()
  .then(() => console.log("MySQL authenticated"))
  .catch(err => console.error("DB error:", err));


db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(DB_PORT, () => {
    console.log(`Server running on DB_PORT ${DB_PORT}`);
  });
});
