let express = require('express')
let app = express();
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
//const mongoUrl = "mongodb://localhost:27017"
const mongoUrl="mongodb+srv://test:test123@cluster0.p7mvq.mongodb.net/evento?retryWrites=true&w=majority"
const dotenv=require('dotenv')
dotenv.config();
const bodyParser=require('body-parser')
const cors=require('cors')
let port=process.env.PORT || 8200;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

/* Main Page */
app.get('/',(req,res)=>{
    res.send('Welcome to the database of EVENTO')
})

/* Get Location */
app.get('/location',(req,res) => {
    db.collection('location').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

/* Get Restaurant Location */
app.get('/restaurants',(req,res) => {
    db.collection('restaurantlocation').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})



MongoClient.connect(mongoUrl, (err, connection) => {
    if(err) console.log('Error While Connecting');
    db = connection.db('evento')
    app.listen(port,() => {
        console.log(`Listening to the port ${port}`)
    });
})