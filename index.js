

const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { query } = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());



// Verify Token of JWT Function
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.a_t_s, (error, decoded) => {
      if (error) {
          return res.status(403).send({ message: 'Forbidden access' });
      }
      req.decoded = decoded;
      next();
  })
}



// USER: carsUser2022
// PASS: TMMjvmLhkv2XOrMh

// access token: 40ae131e80141d03443d4026f41019b7e075393ed0e60d1dd3c65262f02fd543d1677af508533d5b0d93df1511d0ced94140b2a3cc3770f77069d3eb46506093


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
    app.delete('/products/:id', async(req , res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await carCollention.deleteOne(query);
      res.send(result)
    })
    //  add New Items here......
    app.post('/products', async (req , res) =>{
      const newCar = req.body;
      console.log(newCar);
      const result = await carCollention.insertOne(newCar);
      res.send(result)
    })
    // add new Quantity Or Stock
    app.put('/products/:id' , async (req ,res) =>{
      const id = req.params.id;
      // console.log(id);
      const quantity = req.body;
      // console.log(quantity);
      const query = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          stock:quantity.newStock
        },
      };
      // console.log(updateDoc);
        const result = await carCollention.updateOne
        (query,updateDoc,options);
        res.send(result) ;
        
    })


    // -----My Items here ------
    app.get('/items', verifyToken, async (req, res) => { 
      const decodedEmail = req.decoded.email;
      const email = req.query.email;
      console.log(email);
      if(email===decodedEmail){
        const query= { email: email };
        const cursor = carCollention.find(query);
        const product = await cursor.toArray();
        res.send(product);
      }
      else{
        res.status(403).send({message: 'forbidden access'})
      }
    });

    // Auth -----token
    app.post('/login', async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.a_t_s, {
          expiresIn: '5d'
      });
      res.send({ token });
  })
   }
   finally{

   }
 }
 run().catch(console.dir);
 
 app.get('/' , (req , res)=>{
   res.send('Car Collection ');

 });

 app.listen(port , () =>{
   console.log('Server is ' , port);
 });

//  npx kill-port 8000