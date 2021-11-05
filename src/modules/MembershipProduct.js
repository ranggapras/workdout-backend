const pool = require('../configs/dbconnect');

const getMembershipProducts = (request, response) => {
  pool.query('SELECT * FROM public."MembershipProduct"', (error, results) => {
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

const getMembershipProduct = (request, response) => {
  const { idMembershipProduct } = request.params;
  pool.query(`SELECT * FROM public."MembershipProduct" WHERE "idMembershipProduct" = '${idMembershipProduct}'`, (error, results) => {
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

const addMembershipProduct = (request, response) => {
  const { days,price, session } = request.body;
  pool.query(`INSERT INTO public."MembershipProduct" ("price", "session","days") VALUES
    ('${price}', '${session}', '${days}')  RETURNING "idMembershipProduct"`, (error, results) => {
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

const updateMembershipProduct = (request, response) => {
  const { idMembershipProduct } = request.params;
  const { session, days,price } = request.body;
  pool.query(`UPDATE public."MembershipProduct" SET "days" = '${days}', "session" = '${session}',"price"='${price}'
    WHERE "idMembershipProduct" = '${idMembershipProduct}'`, (error, results) => {
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
  getMembershipProducts,
  getMembershipProduct,
  addMembershipProduct,
  updateMembershipProduct,
}