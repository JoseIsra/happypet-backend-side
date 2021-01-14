const { Sequelize } = require('sequelize');
const petModel = require('../models/pet');
const categoryModel = require('../models/category');
const clientModel = require('../models/client');
const productModel = require('../models/product');
const saleModel = require('../models/sale');
const saleDetailModel = require('../models/sale_detail');
const appointmentModel = require('../models/appointment');
const serviceTypeModel = require('../models/service_type');
const subCategoryModel = require('../models/sub_category');

//credentials
const DB = require('../dbcredentials');
const db = {}; //para las fututras sentencias

const sequelize = new Sequelize(
    DB.database,
    DB.user,
    DB.password,
    {
        host: DB.host,
        dialect: 'mysql'
    });

const Pet = petModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const Client = clientModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Sale = saleModel(sequelize, Sequelize);
const SaleDetail = saleDetailModel(sequelize, Sequelize);
const Appointment = appointmentModel(sequelize, Sequelize);
const ServiceType = serviceTypeModel(sequelize, Sequelize);
const SubCategory = subCategoryModel(sequelize, Sequelize);


sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    }).catch((err) => console.log(err));

db.sequelize = sequelize
db.Sequelize = Sequelize
const model = {
    'pet': Pet,
    'category':Category,
    'client':Client,
    'product':Product,
    'sale':Sale,
    'saleDetail':SaleDetail,
    'appointment':Appointment,
    'serviceType':ServiceType,
    'subCategory':SubCategory,
    'statement':db

};
module.exports = model;

