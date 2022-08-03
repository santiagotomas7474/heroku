const pool = require("../db");

const getProducts = async () => {
try{
    const query = "select * from products";
    const row = await pool.query(query);
    return row;  
} catch (error) {
    error.message = error.code
    return error
}
};
const getProduct = async (id) => {
    try{
        const query = "select * from products where id =?";
        const rows = await pool.query(query, [id]);
        return rows; 
    } catch (error) {
        error.message = error.code
        return error
    }
}

const addProduct = async (data) => {
    try{
        const query = "insert into products set?";
        const row = await pool.query(query, [data]);
        return row;
    } catch(error){
        error.message = error.code
        return error
    }
};
const deleteProduct = async (id) => {
    try{
    const query = "delete from products where id = ?";
    const row = await pool.query(query, [id]);
    return row;
    } catch(error){
        error.message = error.code
        return error
    }
};
async function modifyProduct(data, id) {
    try {
      const query = "update products set ? where id = ?";
      const row = await pool.query(query, [data, id])
      return row;
    } catch (error) {
        error.message = error.code
        return error
    }
  }

module.exports = { getProducts, addProduct, deleteProduct, getProduct, modifyProduct };