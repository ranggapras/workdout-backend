const pool = require('../configs/dbconnect');

const getPromos = (request, response) => {
  pool.query('SELECT * FROM public."Promo"', (error, results) => {
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

const getPromo = (request, response) => {
  const { idPromo } = request.params;
  pool.query(`SELECT * FROM public."Promo" WHERE "idPromo" = '${idPromo}'`, (error, results) => {
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
    const result = {
      data: results.rows[0],
      code: 200,
      message: 'success'
    }
    return response.status(200).json(result)
  })
}

const addPromo = (request, response) => {
  const { name,description,type,amount,isFixed = false } = request.body;
  pool.query(`INSERT INTO public."Promo" ("name", "description","type","amount","isFixed") VALUES
    ('${name}', '${description}','${type}','${amount}','${isFixed}')  RETURNING "idPromo"`, (error, results) => {
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

const updatePromo = (request, response) => {
  const { idPromo } = request.params;
  const { name,description,type,amount,isFixed = false } = request.body;
  pool.query(`UPDATE public."Promo" SET "name" = '${name}', "description" = '${description}',"type"='${type}',"amount"='${amount}',"isFixed"='${isFixed}'
    WHERE "idPromo" = '${idPromo}'`, (error, results) => {
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
  getPromo,
  getPromos,
  addPromo,
  updatePromo,
}