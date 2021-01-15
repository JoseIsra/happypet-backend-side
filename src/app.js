const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const model = require('./dbconfig/dbconfig');
const session = require('express-session');
const passport = require('passport');
const SessionStore =  require('express-session-sequelize')(session.Store);
const app = express();
require('./passport/passport')(passport);
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
const sequelizeSessionStore = new SessionStore({
    db: model.seque,
    table:'sessions'
});



app.use(session({
    proxy:true,
    secret:"the secrete madafaka secret",
    resave: false,
    store:sequelizeSessionStore,
    saveUninitialized: false,
    cookie:{secure:true}
}));


app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/api', require('./routes/api'));

//server
app.listen(process.env.PORT|| PORT , console.log(`BEEP BEEP te escucho ${PORT}`));