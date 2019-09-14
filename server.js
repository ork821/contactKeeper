const express = require('express');
const app = express();
const connectDB = require('./config/db')
const bodyParser = require('body-parser')


//connect db
connectDB();

//Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))



app.get('/', (req, res) => {
    res.json({msg: 'Weclome to the Contact Keeper API'})
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Listening on port - ${PORT}`))