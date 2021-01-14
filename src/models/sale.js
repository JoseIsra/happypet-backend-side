

module.exports = (sequlize, type) => {
    return sequlize.define("sale", {
        idsale: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idclient:{
            type:type.INTEGER,
            references:{
                model:'clients',
                key:'idclient',
                onDelete: 'cascade'
            }
                },
        bill_number:{
            type:type.STRING(10),
            unique:true,
            allowNull:false
            
        },
        total:{
            type: type.DECIMAL(10,2),
            aLLowNull: false,
        },
        date:{
            type:type.DATE
        }

    }, {
        timestamps: false
    })
}