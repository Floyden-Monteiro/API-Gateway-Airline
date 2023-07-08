const CurdRepository = require('./crud-repository');
const { Role } = require('../models');

class RoleRepository extends CurdRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(name) {
    const role = await Role.findOne({ where: { name: name } });
    return role;
  }
}

module.exports = RoleRepository;
