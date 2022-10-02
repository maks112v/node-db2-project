const yup = require('yup');
const db = require('../../data/db-config.js');
const vinValidator = require('vin-validator');
const carSchema = yup.object().shape({
  vin: yup.string().required('vin is missing'),
  make: yup.string().required('make is missing'),
  model: yup.string().required('model is missing'),
  mileage: yup.number().required('mileage is missing'),
});

const checkCarId = async (req, res, next) => {
  const car = await db('cars').where('id', req.params.id).first();

  if (car) {
    next();
  } else {
    res
      .status(404)
      .json({ message: `car with id ${req?.params?.id} is not found` });
  }
};

const checkCarPayload = (req, res, next) => {
  carSchema
    .validate(req.body)
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const checkVinNumberValid = async (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);
  if (isValidVin) {
    next();
  } else {
    res.status(400).json({ message: `vin ${req?.body?.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const car = await db('cars').where('vin', req.body.vin).first();
  if (car) {
    res.status(400).json({ message: `vin ${req?.body?.vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
