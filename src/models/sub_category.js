

module.exports = (sequelize, type) => {
    return sequelize.define("sub_category", {
        idsub_category: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_category: {
            type: type.INTEGER,
            refereneces: {
                model:'categories',
                key:'idcategory',
            }
        },
        sub_cat_name:{
            type:type.STRING
        }
    }, {
        timestamps: false
    })
}