const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AccountMiddleware {
  async update(req, res, next) {
    try {
      const {username} = req.body
      const existUserWithUsername = await User.findOne({ username });

      if (
        existUserWithUsername &&
        existUserWithUsername._id.toString() !== decodedUser.user._id
      ) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng này đã được sử dụng, vui lòng chọn tên khác!",
        });
      }

      if (username === process.env.ADMIN_LOGIN) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng không đúng!",
        });
      }

      next()
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AccountMiddleware;
