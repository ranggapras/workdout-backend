const express = require('express')
const cors = require('cors')
const auth = require('./config/auth');

const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
const { getUsers, registerUser, loginUser } = require('./modules/User')

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users',getUsers);
app.post('/register', [auth.basicValidation], registerUser);
app.post('/login', [auth.basicValidation], loginUser);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
