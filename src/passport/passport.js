const LocalStrategy = require('passport-local').Strategy;
const model = require('../dbconfig/dbconfig');
const bcrypt = require('bcryptjs');
module.exports = function(passport) {

    passport.use( new LocalStrategy({
        usernameField: 'cli_email',
        passwordField: 'cli_password',
        session:true
    }, async(cli_email, cli_password, done)=> {
        const client = await model.client.findOne({
            where:{
                cli_email
            }
        });

        if(!client){
            console.log("no hay usuario");
            return done(null, false);   
        }else{
            bcrypt.compare(cli_password , client.cli_password, (err, match) => {
                if(!match){
                    return done(null , false);
                }else{
                    console.log("hay usuario");
                    return done(null, client);
                }
            })
        }
    } ));

    //serializando el usuario
    passport.serializeUser((user, done)=> {
        done(null, user.idclient); //pasamos el id del usuario para serializarlo
    });


    passport.deserializeUser((id, done)=> { //deserializamos al usuario, a partir de su id
        model.client.findByPk(id,{
            attributes:['idclient','cli_name','cli_lastname','cli_email','is_admin']
        }).then(user => {
            done(null,user);
        }).catch(err => console.log(err))
    });

}
