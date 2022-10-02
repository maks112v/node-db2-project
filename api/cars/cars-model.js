const db = require('../../data/db-config.js');

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db('cars').where({ id }).first();
};

const create = (car) => {
  return db('cars')
    .insert(car)
    .then(([id]) => getById(id));
};

module.exports = {
  getAll,
  getById,
  create,
};
