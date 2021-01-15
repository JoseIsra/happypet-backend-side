const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const session = require('express-session');
const passport = require('passport');
const app = express();
require('./dbconfig/dbconfig');

const PORT = 4000;

//bodyparser
app.use(express.urlencoded({extended:false}));
//middlewares config
app.use(express.json());
app.use(cors({
    origin:'https://ha-ppypet.netlify.app',
    credentials:true
}));
app.use(morgan("dev"));

app.use(session({
    secret:"the secrete madafaka secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));


app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);
//routes
app.use('/api', require('./routes/api'));

//server
app.listen(process.env.PORT|| PORT , console.log(`BEEP BEEP te escucho ${PORT}`));