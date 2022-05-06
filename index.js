

const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());







// USER: carsUser2022
// PASS: TMMjvmLhkv2XOrMh




const uri = `mongodb+srv://${process.env.db_USER}:${process.env.db_PASS}@cluster0.s6inp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
   try{
     await client.connect();
     const carCollention = client.db('carCollections').collection('car');
    //  -----Products Collection working here----
    app.get('/products', async (req, res) => { 
      const query = {} ;
      const cursor = carCollention.find(query);
      const product = await cursor.toArray();
      // console.log(product);
      res.send(product);
    });
    // --------find One product id--------...
    app.get('/products/:id' , async(req , res )=>{
      const id = req.params.id;
      // console.log(id);
      const query = {_id: ObjectId(id)};
      const products = await carCollention.findOne(query);
      res.send(products);
    })
    // delete items here----

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