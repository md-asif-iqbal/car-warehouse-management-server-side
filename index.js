

const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());







// USER: carsUser2022
// PASS: TMMjvmLhkv2XOrMh




const uri = "mongodb+srv://carsUser2022:<password>@cluster0.s6inp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
   try{

   }
   finally{

   }
 }
 run().catch(console.dir);
 
 app.get('/' , (req , res)=>{
   res.send('Car Collection server is running');

 });

 app.listen(port , () =>{
   console.log('Server is running to port' , port);
 });