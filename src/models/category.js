

module.exports =(sequelize ,type) => {
    return sequelize.define("category", {
        idcategory: {
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        cat_name: {
            type:type.STRING
        }

    }, {
        timestamps:false
    })
}