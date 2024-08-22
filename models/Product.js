
module.exports=(sequelize, DataType)=>
    {
        const Product = sequelize.define("Product", 
              {
                name:{
                    type: DataType.STRING,
                    allowNull:false
                },
                price:{
                    type: DataType.INTEGER,
                    allowNull:false
                },
                description:{
                    type: DataType.STRING,
                    allowNull:false
                },
              });
            
              Product.associate=models=>{
                Product.belongsTo(models.User,
                    {
                        onDelete:"cascade"
                    }
                )
            }
        
        return Product;
    }