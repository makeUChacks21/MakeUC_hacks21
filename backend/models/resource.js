/* eslint-disable prefer-promise-reject-errors */
const mongoose = require('mongoose');
const validator = require('validator');
const NotFoundedError = require('../errors/NotFoundedError');
const { noSuchID } = require('../utils/constants');

// describes the article schema
const budgetSchema = new mongoose.Schema({
  type: { //the budget's category
    type: String,
    required: true
  },
  title: { //budget's title
    type: String,
    required: true
  },
  description: { //budget's description
    type: String,
    required: true
  },
  publishedAt: { //date the budget was created
    type: Date,
    default: Date.now,
  },
  icon: { //link to the image for the article
    type: String,
    required: false,
    validate: {
      validator: (v) => validator.isURL(v, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: true,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: false,
      }),
      message: 'You must provide a valide URL for the image',
    }
  },
  owner: { //_id of the user who saved the article
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false // default behavior to unable database to return this field
  }
});

budgetSchema.statics.theOwner = function isTheOwner(id) {
  return this.findOne({ _id: id }).select('+owner')
    .then((budget) => {
      if (!budget) {
        return Promise.reject(new NotFoundedError(noSuchID));
      }

      return budget.owner;
    })
    .catch((err) => Promise.reject({ statusCode: err.statusCode || 400, message: err.message }));
};

// creates the model and export it
module.exports = mongoose.model('article', budgetSchema);
