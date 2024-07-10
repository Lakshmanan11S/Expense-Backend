const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const PORT = 5500;

const userrouter = require('./Router/Router');
const addrouter = require('./Router/Addrouter');
const addcustomerrouter = require('./Router/Addcustomerrouter');
const emailrouter = require('./Router/Emailrouter');
 
const app = express();

require('dotenv').config();


app.use(bodyparser.json({ limit: '50mb' }));
app.use(express.json());
app.use(cors());


const db = mongoose.connect(process.env.DATABASE_URL)
console.log(process.env.DATABASE_URL)
db.then(()=>{
    console.log("Mongo db connected");
})
.catch(err => console.log("Error", err))

cron.schedule('0 0 1 * *', () => {
  console.log('Running getdetails on the 1st of the month');
  getdetails();
});


app.get('/getdetails', async (req, res) => {
  await getdetails();
  res.send('Details fetched');
});

app.get('/', (req, res) => {
  res.send("AccountsDetails");
});

app.use('/api', userrouter);
app.use('/api', addrouter);
app.use('/api', addcustomerrouter);
app.use('/api', emailrouter);


app.listen(PORT, () => {
  console.log("Server is running on:", PORT);
});
