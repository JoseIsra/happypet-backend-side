const model = require('../dbconfig/dbconfig');
const { QueryTypes } = require('sequelize');



module.exports = {
    getProducts: async(req, res) =>{
        const {id} = req.params;
        const products = await model.statement.sequelize.query(`
        SELECT idproduct, prod_name , prod_price, prod_image ,prod_description, prod_idsubcategory FROM products p
    INNER JOIN sub_categories sc ON p.prod_idsubcategory = sc.idsub_category
    INNER JOIN categories c ON sc.id_category = c.idcategory where c.idcategory = ?
        `, {
            replacements:[`${id}`],
            type:QueryTypes.SELECT
        });
        const productsJson = JSON.stringify(products);
        res.send(productsJson);
        res.end();
    },

    getProductById: async (req, res) => {
        const { id } = req.params;

        const product = await model.product.findByPk(id,{
                attributes:['idproduct','prod_name','prod_price','prod_description','prod_image']
            
        });

            const productJson = JSON.stringify(product);
            res.send(productJson);res.end();
    },
    buyingInfo:async(req, res) =>{
            const {id, basket , total} = req.body;
                //boleta random
                let randomBill = Math.random().toString(36).substring(2,12); 
                //autenticar boleta random para guardar en sale_details
                const sale = await model.sale.findOne({
                    where:{
                        bill_number:randomBill
                    }
                });
                if(!sale){
                    await model.sale.create({
                        idclient:id,
                        bill_number:randomBill,
                        total:total,
                        date:new Date()
                    });
                    basket.forEach(async(item) => {
                        await model.saleDetail.create({
                            bill_number:randomBill,
                            idproduct:item.idproduct,
                            quantity:item.cantidad
                        });
                });
                }else{
                    return;
                }
            res.send("compra realizada");
    },
    sendDashInfo:async (req, res)=>{
        try{        
        const maxtotal = await model.sale.max('total');
        const soldProducts = await model.statement.sequelize.query(`
        select prod_name, COUNT(idproduct) as cantidad from sale_details 
        inner join products using (idproduct)
        group by (idproduct) order by count(idproduct) desc limit 5
        `,{
            type:QueryTypes.SELECT
        });
        const servicesDone = await model.statement.sequelize.query(`
        select serv_type_name ,count(serv_type) as cantidad from appointments ap inner join
        service_types st on ap.serv_type= st.idservice_type  group by serv_type ; 
        `,{
            type:QueryTypes.SELECT
        });

        const sells = await model.statement.sequelize.query(`
        select total, CONCAT(DAY(date),' ',DAYNAME(date),', ',MONTHNAME(date)) as fecha from sales order by total desc limit 7`,
        {
            type:QueryTypes.SELECT
        });

        const sumTotal = await model.sale.sum('total');

        //package and send
        let obj={
            max:JSON.stringify(maxtotal),
            importantProducts:soldProducts,
            services:servicesDone,
            sells:sells,
            sumTotal:sumTotal
        }
            res.send(obj);res.end();
        }catch(err){
                console.log(err);
        }
    }
}