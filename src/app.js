require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const habitRoutes = require("../routes/Habit");
app.use("/api/habits", habitRoutes)

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log("Error de conexión:", error));

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
