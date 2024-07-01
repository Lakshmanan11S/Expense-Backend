const express = require ('express');
const bodyparser = require('body-parser');
const cors = require ('cors');
const mongoose = require ('mongoose');
const cron = require('node-cron')
const PORT = 5500;

const userrouter = require('./Router/Router')
const addrouter = require('./Router/Addrouter')

const app = express()
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

require ('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{console.log("mongodb is connected")})
.catch(()=>{console.log("mongodb is not connected")})

cron.schedule('0 0 1 * *', () => {
    console.log('Running getdetails on the 1st of the month');
    getdetails();
});

app.get('/getdetails', async (req, res) => {
    await getdetails();
    res.send('Details fetched');
});

app.get('/',(req,res)=>{
    res.send("AccountsDetails")
})

app.use('/api',userrouter)
app.use('/api',addrouter)

app.listen(PORT,()=>{console.log("server is running on:",PORT)})