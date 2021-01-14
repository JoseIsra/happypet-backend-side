

module.exports = (sequelize, type) => {
    return sequelize.define("appointment", {
        id_appoint: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    message:{
            type:type.TEXT
        },
        client_number:{
            type:type.STRING
        },
        id_client:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model:'clients',
                key:'idclient',
            }
        },
        serv_type:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model:'service_types',
                key:'idservice_type',
            }
        }


    }, {
        timestamps: false
    })
}