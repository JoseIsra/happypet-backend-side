const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const app = express();
require('./dbconfig/dbconfig');
require('./passport/passport')(passport);
const PORT = 4000;

//bodyparser

//middlewares config
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(morgan("dev"));

app.use(session({
    secret:"the secrete madafaka secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api', require('./routes/api'));

//server
app.listen(process.env.PORT|| PORT , console.log(`BEEP BEEP te escucho ${PORT}`));