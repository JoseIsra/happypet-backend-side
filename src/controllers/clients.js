const passport = require('passport');
const model = require('../dbconfig/dbconfig');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');
const { response } = require('express');


module.exports = {
    saveClient: async(req, res)=>{
        //autenticar correo
    try{
        const client = await model.client.findOne({
            where:{
                cli_email:req.body.cli_email
            }
        })
        if(!client){
            let hashPassword
            // hashear la contraseña
            hashPassword = bcrypt.hashSync(req.body.cli_password , 10);
            //guardar el registro
            req.body.cli_password = hashPassword;
            await model.client.create(req.body);
            console.log("datos registrados");
            res.end();
        }else{
            res.send("Ese correo ya existe");res.end();
        }
    }catch(err){
        console.log(err);
    }},
    getUser:(req, res)=>{
        res.send(req.user);res.end();
    },
    getBills: async(req, res)=>{
        try{
            const bills = await model.sale.findAll( {
                attributes:['bill_number','total','date'],
                where:{
                    idclient:req.user.idclient
                }
            })
            const billsJson = JSON.stringify(bills);
            res.send(billsJson);res.end();

        }catch(err){
            console.log(err);
        }
    },
    getBillData: async(req, res)=>{
            const {idBill} = req.params;
            const infoBills = await model.statement.sequelize.query(`
            SELECT prod_name, prod_price, quantity FROM products 
            INNER JOIN sale_details USING (idproduct) WHERE bill_number = ?
            `, {
                replacements:[`${idBill}`],
                type:QueryTypes.SELECT
            });
            const dataJson = JSON.stringify(infoBills);
            res.send(dataJson);res.end();

    },
    saveAppointment: async(req, res)=>{
        const {message, telephone ,service} = req.body;
        try{
            await model.appointment.create({
                message:message,
                client_number:telephone,
                id_client:req.user.idclient,
                serv_type:service
            });
            res.send("cita guardada exitosamente");
        }catch(err){
            console.log(err);
        }
    },
    logout:(req, res)=>{
        req.logout();
        res.send("sesion terminada");
    }


};