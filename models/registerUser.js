const pool = require("../db");



const addData = async (user, pass, mail) =>{
   try{
      const query = "insert into users (user_name, user_pass, mail) values (?, ?, ?)";
      const row = await pool.query(query,[ user, pass, mail]);
      return row; 
   } catch(error) {
      error.message = error.code
      return error
   }
   };

module.exports = { addData };
