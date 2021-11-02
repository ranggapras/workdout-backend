const pool = require('../configs/dbconnect');

const getProducts = (request, response) => {
  pool.query('SELECT * FROM public."Product"', (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows,
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const getProduct = (request, response) => {
  const { idProduct } = request.params;
  pool.query(`SELECT * FROM public."Product" WHERE "idProduct" = '${idProduct}'`, (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    pool.query(`UPDATE public."Product" SET "views" = '${results.rows[0].views + 1}' WHERE "idProduct" = '${idProduct}'`, (error, results) => {
        if (error) {
            return response.status(500).send({
              code: 500,
              message: "Failed!"
            });
          }
    })
    const result = {
      data: results.rows[0],
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const addProduct = (request, response) => {
  const { name,description,stock,price = false } = request.body;
  pool.query(`INSERT INTO public."Product" ("name", "description","stock","price") VALUES
    ('${name}', '${description}','${stock}','${price}')  RETURNING "idProduct"`, (error, results) => {
        if (error) {
          return response.status(500).send({
            code: 500,
            message: "Failed!"
          });
        }
      const result = {
        data: results.rows[0],
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}

const updateProduct = (request, response) => {
  const { idProduct } = request.params;
  const { name,description,stock,price = false } = request.body;
  pool.query(`UPDATE public."Product" SET "name" = '${name}', "description" = '${description}',"stock"='${stock}',"price"='${price}'
    WHERE "idProduct" = '${idProduct}'`, (error, results) => {
      if (error) {
          console.log(error);
        return response.status(500).send({
          code: 500,
          message: "Failed!"
        });
      }
      const result = {
        data: {},
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
  })
}

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
}