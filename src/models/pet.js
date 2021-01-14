
module.exports =(sequelize ,type) => {
    return sequelize.define("pet", {
        idpet : {
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        pet_name: {
            type:type.STRING
        }

    }, {
        timestamps:false
    })
}