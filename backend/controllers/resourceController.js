const Resource = require('../models/resource');
const BadRequestError = require('../errors/BadRequestError');
const Forbidden = require('../errors/Forbidden');
const NotFoundedError = require('../errors/NotFoundedError');
const { badRequest, noSuchID, notOwner} = require('../utils/constants');

function getBudgets(req, res, next) {
  return Resource.find({})
    .then((resources) => {
      res.status(200).send(resources);
    })
    .catch(next);
}

function createBudget(req, res, next) {
  const { type, title, description, icon, date } = req.body;
  console.log('budget owner: ', req.user._id);

  return Resource.create({ type, title, description, icon, date, owner: req.user._id })
    .then((resource) => {
      if (!resource) {
        throw new BadRequestError(badRequest);
      }

      res.status(201).send(resource);
    })
    .catch(next);
}

function deleteBudget(req, res, next) {
  const owner = Article.theOwner(req.params.articleId);

  return Resource.findByIdAndRemove(req.params.articleId)
    .then((resource) => {
      if (!resource) {
        throw new NotFoundedError(noSuchID);
      } else if (owner.toString() !== req.user._id) {
        throw new Forbidden(notOwner);
      } else {
        return res.status(200).send(resource);
      }
    })
    .catch(next);
}

module.exports = {
  getBudgets,
  createBudget,
  deleteBudget
};
