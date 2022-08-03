const pool = require("../db");

const getUser = async (mail) => {
  try{
  const query = `SELECT * FROM users WHERE mail = '${mail}'`;
  const row = await pool.query(query);
  return row;
  }catch (error){
    error.message = error.code
    return error
  }
};

module.exports = { getUser };