const pool = require('../configs/dbconnect');

const getCarts = (request, response) => {
  const { idUser } = request.params;
  pool.query(`SELECT * FROM public."view_cart" WHERE "idUser" = '${idUser}'`, (error, results) => {
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

const addCart = (request, responfse) => {
  const { idUser,amountItems,idProduct = false } = request.body;
  pool.query(`INSERT INTO public."Cart" ("idUser", "amountItems","idProduct") VALUES
    ('${idUser}', '${amountItems}','${idProduct}')  RETURNING "IdCart"`, (error, results) => {
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

const updateItem = (request, response) => {
  const { idCart } = request.params;
  const { amountItems = false } = request.body;
  pool.query(`UPDATE public."Cart" SET "amountItems" = '${amountItems}' WHERE "idCart" = '${idCart}'`, (error, results) => {
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

const deleteCart = (request, response) => {
  const { idCart } = request.params;
  pool.query(`DELETE public."Cart" WHERE "idCart" = '${idCart}'`, (error, results) => {
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
  getCarts,
  deleteCart,
  updateItem,
  addCart,
}