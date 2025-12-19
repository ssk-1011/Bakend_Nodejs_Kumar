const express = require('express');
const app = express();
const dotenv = require('dotenv');
const moongoose = require('mongoose');
const venderRoutes = require('./routes/venderRoutes');
const firmRout = require('./routes/firmRout');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');
const path = require('path');

const port =4000;
dotenv.config();


moongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
  console.log("MoongoDB connected successfully"); 
})
.catch((err)=>{
  console.log("MoongoDB connection failed", err);
});

app.get('/home',(req,res)=>{
  res.send("Welcome to Foodies Backend Hello Satish Kumar");
})

app.use(bodyParser.json());
app.use("/vender", venderRoutes);
app.use("/firm", firmRout);
app.use("/product", productRoutes);
app.use('/uploads', express.static("uploads"));



app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})




