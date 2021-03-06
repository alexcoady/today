// NPM depedencies
import jwt from 'jsonwebtoken';

/**
 *  @function generateToken
 *  @param {User} user user to generate a token for
 *  @param {String} secret app secret
 *  @return {String} token
 */
export const generateToken = (user, secret) => {
  return jwt.sign({
    id: user._id
  }, secret, {
    expiresIn: '1d'
  });
};
