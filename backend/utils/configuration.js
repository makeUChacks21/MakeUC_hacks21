const privateKey = 'dev-secret';
const { DATABASE_URL = 'mongodb://localhost:27017/make-uc' } = process.env;

module.exports = {
  privateKey,
  DATABASE_URL
};
