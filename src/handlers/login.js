const { connection } = require("../db/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const login = async (request, h) => {
  const { username, password } = request.payload;

  try {
    // Retrieve user from database
    const user = await new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM users WHERE username = ?";
      connection.query(queryString, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!user) {
      return h
        .response({
          error: true,
          message: "Username salah",
        })
        .code(401);
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return h
        .response({
          error: true,
          message: "Password salah",
        })
        .code(401);
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    // Successful login response
    return h
      .response({
        error: false,
        message: "Login berhasil",
        loginResult: {
          email: user.email,
          userId: user.username,
          token: token,
        },
      })
      .code(200);
  } catch (error) {
    console.error("Terjadi kesalahan saat login:", error);
    return h
      .response({
        error: true,
        message: "Terjadi kesalahan saat login",
      })
      .code(500);
  }
};

module.exports = login;
