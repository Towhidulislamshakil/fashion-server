const express = require('express')
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser')
const objectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3vod.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(process.env.DB_NAME)


const port = 5500;


const app = express()


app.use(cors())
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('hello from db,it warking')
})





client.connect(err => {
  const volunteerCollection = client.db("fashionup").collection("events");
  const volunteeringInfo = client.db("fashionup").collection("events");
  console.log("Database connected Successfully")

  // data send to the database

  // app.post('/volunteer', (req, res) => {
  //   const volunteers = req.body;
  //   // console.log(volunteers)
  //   volunteerCollection.insertMany(volunteers)
  //     .then(result => {
  //       // console.log(result.insertedCount)
  //       res.send(result.insertedCount)
  //     })
  // })

  // data received from database

  app.get('/volunteering', (req, res) => {
    volunteerCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.get("/volunteering/:id", (req, res) => {
    volunteerCollection.find({ _id: objectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      })
  })

  app.post('/addEvents', (req, res) => {
    const volunteeringInformation = req.body;
    volunteeringInfo.insertOne(volunteeringInformation)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/volunteerEvents', (req, res) => {
    volunteeringInfo.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents)
      })
  })


  app.get('/adminPanel' , (req , res) =>{
    volunteeringInfo.find({})
    .toArray((err , documents) =>{
      res.send(documents)
    })
  })





});




app.listen( process.env.PORT || port)