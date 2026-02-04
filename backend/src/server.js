const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const db = require("./db");
const initDb = require("./db/initDb");
const authRoutes = require("./routes/auth.routes");
const cardsRoutes = require("./routes/cards.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

initDb(db);

app.use("/api/auth", authRoutes);
app.use("/api/cards", cardsRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
