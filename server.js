const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
const router = require('./routes/card-router')

require('dotenv').config()

const port = process.env.PORT || 4000

const db = 'mongodb+srv://Pumplies:Maximka20051120@cluster0.dfi8dij.mongodb.net/restapi?retryWrites=true&w=majority&appName=Cluster0'

mongoose
    .connect(db)
    .then(() => console.log('DB Connect'))
    .catch((error) => console.log(error));
app.use(express.urlencoded({ extended: true })); // Добавлено для обработки данных формы
app.use(express.json()); // Добавлено для обработки JSON-запросов


    

app.use(cors());
//Отправлять данные в виде JSON
app.use(express.json());
// Настройка CORS
app.use(cors({
  origin: "http://127.0.0.1:5500", // Укажите ваш домен
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

//GET запрос
app.use(router)
// app.get("/api/items", async (req, res) => {
//   try {
//     const cards = await Cards.find();
//     res.json(cards);
// } catch (error) {
//     console.error(error);
//     res.status(500).send('Error retrieving questions');
// }
// });
//POST запрос
app.post("/api/items", (req, res) => {
  const { title, subtitle } = req.body;

  const userCard = new Cards({ title, subtitle })
  userCard.save()

});

// DELETE ЗАПРОС
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  Cards.findByIdAndDelete(id)
      .then(() => res.sendStatus(200))
      .catch((error) => {
          console.error(error);
          res.sendStatus(404);
      });
});

//PUT запрос
app.put("/api/items/:index", (req, res) => {
  // const index = req.params._id;
  // if (Cards[index]) {
  //   Cards[index].completed = true;
  //   res.json(data[index]);
  // } else {
  //   res.status(404).json({ message: "Ошибка при изменении" });
  // }
});
//Запуск сервера
app.listen(port, () => {
  console.log(`Server hosting on 4000 PORT`);
});
