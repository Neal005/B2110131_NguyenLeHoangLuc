const User = require("../models/User");

class AuthMiddleware {
  async register(req, res, next) {
    try {
      const { username, password, fullname, gender } = req.body;
      if (!username || !password || !fullname || !gender) {
        return res.json({
          status: "bad",
          msg: "Điền vào tất cả các dòng!",
        });
      }

      if (username.length < 4) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng phải dài ít nhất 4 ký tự!",
        });
      }

      if (username.length > 20) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng không được vượt quá 20 ký tự!",
        });
      }

      if (username === process.env.ADMIN_LOGIN) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng không đúng!",
        });
      }

      if (password.length < 8) {
        return res.json({
          status: "bad",
          msg: "Mật khẩu phải dài ít nhất 8 ký tự!",
        });
      }

      const existUser = await User.findOne({ username });

      if (existUser) {
        return res.json({
          status: "bad",
          msg: "Tên người dùng này đã tồn tại trong hệ thống. Vui lòng chọn cái khác",
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.json({
          status: "bad",
          msg: "Điền vào tất cả các dòng",
        });
      }

      const existUser = await User.findOne({ username });

      if (!existUser) {
        return res.json({
          status: "bad",
          msg: "Không tìm thấy tài khoản nào cho tên người dùng bạn đã nhập!",
        });
      }

      const comparedPass = await bcrypt.compare(password, existUser.password);

      if (!comparedPass) {
        return res.json({
          status: "bad",
          msg: "Mật khẩu đã được nhập không chính xác!",
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
    }
  }

  async admin(req, res, next) {
    try {
      const {username, password} = req.body
      
      if (!username || !password) {
        return res.json({ status: "bad", msg: "Điền vào tất cả các dòng!" });
      }

      if (username !== process.env.ADMIN_LOGIN) {
        return res.json({ status: "bad", msg: "Sai tên người dùng!" });
      }

      if (password !== process.env.ADMIN_PASS) {
        return res.json({ status: "bad", msg: "Sai mật khẩu!" });
      }

      next()
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = AuthMiddleware;
