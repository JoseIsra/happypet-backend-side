

module.exports = (sequelize, type) => {
    return sequelize.define("service_type", {
        idservice_type: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        serv_type_name:{
            type:type.STRING
        }
    }, {
        timestamps: false
    })
}