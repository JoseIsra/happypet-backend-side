

module.exports = (sequlize, type) => {
    return sequlize.define("service_type", {
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