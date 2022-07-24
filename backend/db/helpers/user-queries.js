const db = require("../");

const getUsers = function () {
  const text = `
  SELECT * FROM users
  `;
  return db
    .query(text)
    .then((data) => data.rows)
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getUserById = function (userId) {
  const text = `
  SELECT * FROM users
  WHERE id = $1;`;
  const values = [userId];
  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => console.error(this, "query failed", err.stack));
};

const getUserByUsername = function (username) {
  const text = `
  SELECT * FROM users 
  WHERE username = $1;`;
  const values = [username];
  return db
    .query(text, values)
    .then((data) => data.rows[0])
    .catch((err) => err);
};


const addUser = async (username, password, city) =>{
  let query = "INSERT INTO users (username, password, city) VALUES ($1, $2, $3)";
  return new Promise((resolve, reject)=>{
      db.query(query,[ username, password, city ],(err,res)=>{
          if(err) {
            return reject(err);
          }
          console.log("HELLO TEST")
          return resolve(res);
      });
  });
};

module.exports = {
    getUserById,
    getUserByUsername,
    getUsers,
    addUser
};