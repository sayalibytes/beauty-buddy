const knex = require("knex")(require("../knexfile"));

exports.index = async (_req, res) => {
  try {
    const data = await knex("users");
    res.json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving User: ${err}`);
  }
};
