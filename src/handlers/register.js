const { connection } = require("../db/database.js");
const bcrypt = require("bcrypt");

const register = async (request, h) => {
  const { username, email, password } = request.payload;

  try {
    // cek jika email sudah ada
    const emailExists = await new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM users WHERE email = ?";
      connection.query(queryString, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });

    if (emailExists) {
      return h
        .response({
          error: true,
          message: "Email sudah digunakan",
        })
        .code(400);
    }

    // cek jika username sudah ada
    const usernameExists = await new Promise((resolve, reject) => {
      const queryString = "SELECT * FROM users WHERE username = ?";
      connection.query(queryString, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.length > 0);
        }
      });
    });

    if (usernameExists) {
      return h
        .response({
          error: true,
          message: "Username sudah digunakan",
        })
        .code(400);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQueryString =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const result = await new Promise((resolve, reject) => {
      connection.query(
        insertQueryString,
        [username, email, hashedPassword],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });

    return h
      .response({
        error: false,
        message: "User berhasil didaftarkan",
      })
      .code(201);
  } catch (error) {
    console.error("Terjadi kesalahan saat registrasi:", error);
    return h
      .response({
        error: true,
        message: "Terjadi kesalahan saat registrasi",
      })
      .code(500);
  }
};

module.exports = register;
