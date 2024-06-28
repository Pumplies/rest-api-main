const Post = require("../models/card-model");
const createPath = require("../helpers/create-path");
const Cards = require('../models/card-model');



const getCards =  async (req, res) => {
    try {
      const cards = await Cards.find();
      res.json(cards);
  } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving questions');
  }
}


module.exports = {
    getCards
}
