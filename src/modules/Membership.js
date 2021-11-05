const pool = require('../configs/dbconnect');

const getMemberships = (request, response) => {
  pool.query('SELECT * FROM public."view_membership"', (error, results) => {
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

const getMembership = (request, response) => {
  const { idMembership } = request.params;
  pool.query(`SELECT * FROM public."view_membership" WHERE "idMembership" = '${idMembership}'`, (error, results) => {
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

const addMembership = (request, response) => {
  const { idUser,idMembershipProduct, startDate, endDate } = request.body;
  pool.query(`INSERT INTO public."Membership" ("idUser", "idMembershipProduct","startDate","endDate") VALUES
    ('${idUser}', '${idMembershipProduct}', '${startDate}', '${endDate}')  RETURNING "idMembership"`, (error, results) => {
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

const updateMembership = (request, response) => {
  const { idMembership } = request.params;
  const { isActive } = request.body;
  pool.query(`UPDATE public."Membership" SET "isActive" = '${isActive}'
    WHERE "idMembership" = '${idMembership}'`, (error, results) => {
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
  getMemberships,
  getMembership,
  addMembership,
  updateMembership ,
}