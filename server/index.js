const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
const corsOptions = {
    origin: 'https://student-client-liard.vercel.app',
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://student-client-liard.vercel.app/');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// app.use(cors(
//     {
//         origin: ["https://student-registration-front-end.vercel.app/"],
//         methods: ["POST", "GET"],
//         credentials: true
//     }
// ));
app.use(express.json())

mongoose.connect('mongodb+srv://dbUser:dbUserPassword@atlascluster.w6sb48g.mongodb.net/test?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})
