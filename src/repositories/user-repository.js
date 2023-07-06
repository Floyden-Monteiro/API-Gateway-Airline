const CurdRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CurdRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }
}

module.exports = UserRepository;
