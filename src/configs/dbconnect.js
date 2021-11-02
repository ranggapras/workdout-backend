const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '47.241.214.211',
  database: 'workdout',
  password: 'workdout',
  port: 5432,
})

module.exports = pool;
