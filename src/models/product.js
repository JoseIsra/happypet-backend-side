

module.exports = (sequelize, type) => {
    return sequelize.define("product", {
        idproduct: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        prod_name:{
            type:type.STRING
        },
        prod_price:{
            type:type.DECIMAL(10,2)
        },
        prod_description:{
            type:type.TEXT
        },
        prod_idsubcategory: {
            type: type.INTEGER,
            aLLowNull: false,
            refereneces: {
                model:'sub_categories',
                key:'idsub_category',
            }
        },
        prod_image:{
            type:type.TEXT
        },
        prod_idpet:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model:'pets',
                key:'idpet'
            }
        }

    }, {
        timestamps: false
    })
}