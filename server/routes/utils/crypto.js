const crypto = require('crypto');
const iterations = 310000;
const keyLen = 32;

const passwordHash = async password => {
  const salt = crypto.randomBytes(16);
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLen, 'sha256', function (err, hashedPassword) {
      if (err) {
        console.error('Password Hashing Error');
      }
      resolve({
        hashedPassword: String.fromCharCode(...hashedPassword),
        salt: String.fromCharCode(salt),
      });
    });
  });
};

const checkPassword = async (givenPassword, password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      givenPassword,
      salt,
      iterations,
      keyLen,
      'sha256',
      function (err, hashedPassword) {
        if (err) {
          console.error('Password Hashing Error');
        }

        resolve(String.fromCharCode(hashedPassword) === password);
      }
    );
  });
};

module.exports = {
  passwordHash,
  checkPassword,
};
