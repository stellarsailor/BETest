const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
  const hashPassword = (passwordString) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(passwordString, salt);

    return hash;
  };

  const comparePassword = (passwordString, hash) => (
    bcrypt.compareSync(passwordString, hash)
  );

  return {
    hashPassword,
    comparePassword,
  };
};

module.exports = bcryptService;
