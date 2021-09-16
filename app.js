
require("dotenv").config();
const Express = require("express"); // api framework
const cors=require('cors');
const app = Express();

const db = require("./db"); // connects to database

const controllers = require("./controllers");

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use("/user", controllers.userController);
app.use(cors());

//app.use(require("./middleware/validate-jwt"));

app.use("/log", controllers.logController);

db.authenticate()
  .then(() => db.sync( { force:true })) 
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server]: App is listening on ${process.env.PORT}`));
  })
  .catch((err) => {
    console.log(`[Server] has crashed: ${err}`);
  });



/*

require('dotenv').config()
const express = require('express');
const { synceDb } = require('./db');
const cors=require('cors'); //added
const app = express()
const port = 3000

;(async() => {
  app.use(express.json())

  app.use(require('./middleware/headers')); //added

  const auth = require('./controllers/Auth')
  app.use("/auth", auth)

  const postPrimary = require('./controllers/PostPrimary')
  app.use('/postPrimary', postPrimary)

  // const PostSecondary = require('./controllers/PostSecondary')
  // app.use('/postSecondary', PostSecondary)

  //synceDb(db, true) //resets tables

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})()

*/
  
