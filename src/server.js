const express = require('express')
const cors = require('cors')

const router = express.Router();
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

require('./routes/User')(router);
require('./routes/Trainer')(router);
require('./routes/Workout')(router);
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
