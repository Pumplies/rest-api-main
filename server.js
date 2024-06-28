const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
const router = require('./routes/card-router');
require('dotenv').config();

const port = process.env.PORT || 4000;

const db = 'mongodb+srv://Pumplies:Maximka20051120@cluster0.dfi8dij.mongodb.net/restapi?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(db)
  .then(() => console.log('DB Connected'))
  .catch((error) => console.error('DB Connection Error:', error));

// Подключение middleware для обработки данных формы и JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Настройка CORS для всех маршрутов
app.use(cors({
  origin: "https://pumplies.github.io/", // Укажите ваш домен
  methods: ["GET", "POST", "PUT", "DELETE"], // Укажите разрешённые методы
  allowedHeaders: ["Content-Type", "Authorization"], // Укажите разрешённые заголовки
}));

// Подключение маршрутов
app.use('/api', router);

// POST запрос для создания элемента
app.post("/api/items", (req, res) => {
  const { title, subtitle } = req.body;
  // Пример сохранения данных в MongoDB, предполагая, что у вас есть модель Cards
  const userCard = new Cards({ title, subtitle });
  userCard.save()
    .then(() => res.status(201).json({ message: 'Card created successfully' }))
    .catch(error => res.status(500).json({ error }));
});

// DELETE запрос для удаления элемента по ID
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  Cards.findByIdAndDelete(id)
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error(error);
      res.sendStatus(404);
    });
});

// PUT запрос для обновления элемента по ID
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { title, subtitle } = req.body;
  Cards.findByIdAndUpdate(id, { title, subtitle }, { new: true })
    .then(updatedCard => res.json(updatedCard))
    .catch(error => {
      console.error(error);
      res.sendStatus(404);
    });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

