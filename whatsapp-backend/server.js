// BUILD an API -------------------------------------------

// import
import express from 'express';


// app config
//      app instance
//      port that the app is gonna run
const app = express();
const port = process.env.PORT || 9000;


// middleware


// DB config


// ???


// api routes
//      call the api and nothing at the end
//      in server world 200 means OK, 201 means createed
app.get("/", (req, res) => res.status(200).send("hello world"));


// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));