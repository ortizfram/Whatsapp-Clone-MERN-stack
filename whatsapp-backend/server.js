// BUILD an API -------------------------------------------

// import
import express from 'express';
import mongoose from 'mongoose';
import Messages from "./dbMessages.js";
//----------------------------------------

// app config
//      app instance
//      port that the app is gonna run
//      check with postman
const app = express();
// specify port 
const port = process.env.PORT || 9000;
//----------------------------------------

// middleware
app.use(express.json());

// DB config   
const connection_url = "mongodb+srv://ortizfram:o8LImqzHsGGsIB1N@cluster0.t2ttprp.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    // help mongoose connect to DB smoothly
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//----------------------------------------

// ???


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