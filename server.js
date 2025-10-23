import express from "express";
import fs from "fs/promises";
import dotenv from "dotenv";
import cors from "cors";
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000; 

app.get("/api/productos", async (req, res) => {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Error al leer productos" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
