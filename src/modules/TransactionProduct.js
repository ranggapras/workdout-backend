const pool = require('../configs/dbconnect');
const { snap } = require('../configs/midtrans');

const getTransactionProducts = (request, response) => {
  pool.query('SELECT * FROM public."TransactionProduct"', (error, results) => {
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

const getTransactionProduct = (request, response) => {
  const { idTransactionProduct } = request.params;
  pool.query(`SELECT * FROM public."TransactionProduct" WHERE "idTransactionProduct" = '${idTransactionProduct}'`, (error, resultsProduct) => {
    pool.query(`SELECT * FROM public."view_cart" WHERE "idCart"
    IN (${resultsProduct.rows[0].idCart.map(d => `'${d}'`).join(',')})`, (error, results) => {
      if (error) {
        console.log(error);
        return response.status(500).send({
          code: 500,
          message: "Failed!"
        });
      }
      const result = {
        data: {
          ...resultsProduct.rows[0],
          cart: results.rows,
        },
        code: 201,
        message: 'success'
      }
      return response.status(200).json(result)
    })
    if (error) {
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
  })
}

const addTransactionProduct = (request, response) => {
  const { idCart, idPromo = '', totalAmount, name } = request.body;
  pool.query(`INSERT INTO public."TransactionProduct" ("idCart", "idPromo", "totalAmount") VALUES
    ('{${idCart.map(d => `"${d}"`).join(',')}}', '${idPromo}', '${totalAmount}')  RETURNING "idTransactionProduct"`, (error, results) => {
      pool.query(`INSERT INTO public."Payment" ("idTransaction", "idPromo", "totalAmount") VALUES
        ('{${idCart.map(d => `"${d}"`).join(',')}}', '${idPromo}', '${totalAmount}')  RETURNING "idTransactionProduct"`, (error, results) => {
          if (error) {
            console.log(error);
            return response.status(500).send({
              code: 500,
              message: "Failed!"
            });
          }
          const orderId = Date.now();
          const parameter = {
            "transaction_details": {
                "order_id": `PROD-${orderId}`,
                "gross_amount": totalAmount
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": nama,
            }
        };
        snap.createTransaction(parameter)
          .then((transaction)=>{
              let transactionUrl = transaction.redirect_url;
              const result = {
                data: {
                  ...results.rows[0],
                  url: transactionUrl
                },
                code: 201,
                message: 'success'
              }
              return response.status(200).json(result)
          })
        })
    if (error) {
      console.log(error);
      return response.status(500).send({
        code: 500,
        message: "Failed!"
      });
    }
  })
}

const updateTransaction = (request, response) => {
  const { idTransactionProduct } = request.params;
  const { status } = request.body;
  pool.query(`UPDATE public."TransactionProduct" SET "status" = '${status}' WHERE "idTransactionProduct"='${idTransactionProduct}'`, (error, results) => {
    if (error) {
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
  getTransactionProducts,
  getTransactionProduct,
  addTransactionProduct,
  updateTransaction,
}