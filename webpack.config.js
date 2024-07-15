const Dotenv = require('dotenv-webpack');

module.exports = {
  // ... các cấu hình khác ...
  plugins: [
    new Dotenv({
      path: './some.other.env' // default is .env
    }),
    // ... thêm plugins khác nếu có
  ]
  // ... các cấu hình khác ...
};