const jwt = require("jsonwebtoken");
const APP_SECRET = "asdiaoshdjr0q39jd0j";

const checkAuth = (context) => {
  const authorization = context.req.headers["authorization"];
  try {
    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      const user = jwt.verify(token, APP_SECRET);
      return user.id;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  checkAuth,
  APP_SECRET
};
