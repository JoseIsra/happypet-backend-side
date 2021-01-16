
const model = require('../dbconfig/dbconfig');
const bcrypt = require('bcryptjs');
const { QueryTypes } = require('sequelize');



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
    loginUser:async(req, res)=>{
        const user = await model.client.findOne({
            attributes:['idclient','cli_name','cli_password','cli_lastname','cli_email','is_admin'],
            where:{
                cli_email:req.body.cli_email
            }
        }); 
        if(!user){
            res.send("Datos inválidos");res.end();
            return ;
        }else{
            bcrypt.compare(req.body.cli_password , user.cli_password, (err, match) => {
                if(!match){
                    res.send("Datos inválidos");res.end();
                    return;
                }else{
                    console.log("hay usuario");
                    console.log(user);
                    res.send(user);res.end();
                }
            })
        }
    },
    getBills: async(req, res)=>{
        const { id } = req.params;
        try{
            const bills = await model.sale.findAll( {
                attributes:['bill_number','total','date'],
                where:{
                    idclient:id
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
        const {id, message, telephone ,service} = req.body;
        try{
            await model.appointment.create({
                message:message,
                client_number:telephone,
                id_client:id,
                serv_type:service
            });
            res.send("cita guardada exitosamente");
        }catch(err){
            console.log(err);
        }
    }

};