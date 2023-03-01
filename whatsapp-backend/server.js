// BUILD an API -------------------------------------------

// import
import express from 'express';
import mongoose from 'mongoose';


// app config
//      app instance
//      port that the app is gonna run
//      check with postman
const app = express();
// specify port 
const port = process.env.PORT || 9000;
/*

// middleware


// DB config
const connection_url = "mongodb+srv://ortizfram:d9SvILNfw2z4rqBb@cluster0.t2ttprp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
*/

// ???


// api routes
//      call the api and nothing at the end
//      in server world 200 means OK, 201 means createed
app.get("/", (req, res) => res.status(200).send("hello world"));


// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));