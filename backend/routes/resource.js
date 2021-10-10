const express = require('express');
const Joi = require('joi').extend(require('@joi/date'));
const { celebrate } = require('celebrate');
const { getBudgets, createBudget, deleteBudget } = require('../controllers/resourceController');

const router = express.Router();

// returns all articles saved by the user
router.get('/', getBudgets);

// Budget type (entertainment, hospital, food, etc..)
// Budget name (whatever) Budget value ($$) -> must be consistent;
// Budget icon type (?)
// Option to display chart on Budget type percentages; /*TODO*/

// creates a budget track with the passed
// type, title, description, date, and image in the body
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      type: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      icon: Joi.string().uri().required(),
      date: Joi.date().format(['YYYY/MM/DD', 'DD-MM-YYYY']).utc(),
    })
  }),
  createBudget
);

// deletes the stored budget by _id
router.delete(
  '/:budgetId',
  celebrate({
    params: Joi.object().keys({
      budgetId: Joi.string().hex().length(24).required()
    })
  }),
  deleteBudget
);

module.exports = router;
