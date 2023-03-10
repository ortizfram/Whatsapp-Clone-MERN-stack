// BUILD an API -------------------------------------------

// import
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
// const Pusher = require('pusher');
import Pusher from 'pusher';

//----------------------------------------

// app config
//      app instance
//      port that the app is gonna run
//      check with postman
const app = express();
// specify port 
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1562117",
    key: "710a62de81cc0e56ae9c",
    secret: "4e67712cd5a0c54c65f4",
    cluster: "us2",
    useTLS: true
  });
//----------------------------------------

// middleware
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

// DB config   
const connection_url = "mongodb+srv://ortizfram:o8LImqzHsGGsIB1N@cluster0.t2ttprp.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    // help mongoose connect to DB smoothly
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//----------------------------------------

// ???

//     change stream
const db = mongoose.connection

db.once('open', ()=>{
    console.log("DB is connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change)=>{
        console.log("A change has occured", change);
    

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.user,
                    message: messageDetails.message
                }
            );
        } else {
            console.log('Error triggering Pusher');
        }
    });    
});

// api routes
//      call the api and nothing at the end
//      in server world 200 means OK, 201 means createed
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
    Messages.find()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    // use Promise instead of callback cause if not it throws error
    //    sucess .then(), error .catch()
    Messages.create(dbMessage)
        .then(data => {  // .then() == if
            res.status(201).send(`new message created: \n ${data}`);
        })
        .catch(err => {  // .catch() == else
            res.status(500).send(err);
        });
});
//----------------------------------------

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));