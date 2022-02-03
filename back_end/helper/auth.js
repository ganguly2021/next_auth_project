import bcryptjs from "bcryptjs";

// create password hash
export const getHashedPassword = (password) => {
  // crseate salt
  const salt = bcryptjs.genSaltSync(10);

  // create hashed password
  return bcryptjs.hashSync(password, salt);
};

// check password match with hashed password
export const isPasswordMatch = (password, hashedPassword) => {
  return bcryptjs.compareSync(password, hashedPassword);
};

// create auth json web token
// export const getJWTToken = (payload) => {
//   return jwt.sign(payload, secret, { expiresIn: '1d' });
// }
