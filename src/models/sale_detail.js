


module.exports = (sequelize, type) => {
    return sequelize.define("sale_detail", {
        idsale_detail: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        bill_number:{
            type:type.STRING(10),
            allowNull:false,
            references:{
                model:'sales',
                key:'bill_number',
                onDelete: 'cascade'
            }
                },
        idproduct:{
            type:type.INTEGER,
            allowNull:false,
            references:{
                model:'products',
                key:'idproduct',
                onDelete:'NO ACTION',
                onUpdate:'NO ACTION'
            }
            
        },
        quantity:{
            type: type.TINYINT
        }

    }, {
        timestamps: false
    })
}