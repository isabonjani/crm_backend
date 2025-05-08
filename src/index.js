const express = require("express");
const dotenv = require("dotenv").config();
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
// Carrega .env correto
//dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const authRoutes = require("./routes/authRoutes");
//const contactRoutes = require("./routes/contactRoutes");
//const interactionRoutes = require("./routes/interactionRoutes");
const app = express();
app.use(express.json());
app.use(logger);
// Rotas
app.use("/api/auth", authRoutes);
//app.use("/api/contacts", contactRoutes);
//app.use("/api/interactions", interactionRoutes);
// Middleware de erro ao final
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
