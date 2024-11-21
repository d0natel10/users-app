const express = require('express');
const cors = require('cors');

const app = express()

//middleware

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended: true}))

//routes

const router = require('./routes/userRouter.js');

app.get("/", (req, res) => {
    res.send("test");
});

app.use('/api/users', router)

//port
const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
})