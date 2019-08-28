const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  port: process.env.PORT,
  db: process.env.DB,
  key: process.env.SECRET,
  refresh_key: process.env.REFRESH_SECRET,
  token : process.env.TOKEN_LIFE,
  refresh_token: process.env.REFRESH_LIFE
};