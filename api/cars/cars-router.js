const router = require('express').Router();
const Cars = require('./cars-model.js');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware.js');

router.get('/', async (req, res) => {
  const cars = await Cars.getAll();

  return res.status(200).json(cars);
});

router.get('/:id', checkCarId, async (req, res) => {
  const car = await Cars.getById(req.params.id);

  return res.status(200).json(car);
});

router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res) => {
    const car = await Cars.create(req.body);

    return res.status(201).json(car);
  }
);

module.exports = router;
