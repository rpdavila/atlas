const bcrypt = require('bcrypt');

const hash = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
}

const compare = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
}

module.exports = {
  hash,
  compare
}