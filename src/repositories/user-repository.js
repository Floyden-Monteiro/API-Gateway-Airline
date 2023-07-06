const CurdRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CurdRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
