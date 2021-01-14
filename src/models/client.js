

module.exports = (sequlize, type) => {
    return sequlize.define("client", {
        idclient: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cli_name:{
            type:type.STRING
        },
        cli_lastname:{
            type:type.STRING
        },
        cli_email:{
            type:type.STRING
        },
        cli_password: {
            type: type.STRING
        },
        is_admin:{
        type:type.BOOLEAN
        }
        

    }, {
        timestamps: false
    })
}