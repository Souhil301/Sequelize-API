const express = require('express'),
      app = express(),
      db = require('./models'),
      userRouter = require('./routes/userRoutes'),
      productRouter = require('./routes/productRoutes');



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', userRouter);
app.use('/api', productRouter);


db.sequelize.sync().then(() =>
{
    app.listen(2200 || process.env.PORT, () =>
        {
            console.log("Server is Running 2200");
        })
})
