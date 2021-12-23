const express = require('express')
const cors = require('cors')

const router = express.Router();
const app = express()

app.use(cors(
  {origin:'*'}
))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

require('./routes/User')(router); //data master untuk user (admin,customer,personal trainer)
require('./routes/Trainer')(router);//data personal trainer
require('./routes/Workout')(router);//workout dengan personal trainer
require('./routes/Activity')(router);//untuk kalkulator aktivitas harian
require('./routes/Promo')(router);//diskon
require('./routes/Notification')(router);//notifikasi
require('./routes/Schedule')(router)//jadwal workout untuk workout planner
require('./routes/TransactionSchedule')(router);//jadwal workout
require('./routes/TransactionProduct')(router);
require('./routes/Membership')(router);
require('./routes/MembershipProduct')(router);
require('./routes/Product')(router);
require('./routes/Cart')(router);
require('./routes/Payment')(router);
app.use('/api', router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
