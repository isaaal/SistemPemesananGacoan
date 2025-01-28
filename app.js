require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/orders", require("./routes/orderRoutes"));
app.use("/menu", require("./routes/menuRoutes"));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));