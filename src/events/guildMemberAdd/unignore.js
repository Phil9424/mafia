const User = require("../../models/User");

module.exports = async (client, member) => {
  const userData = await User.findByPk(member.id);

  if (userData && userData.ignore) {
    userData.ignore = false;
    userData.save();
  }
};
