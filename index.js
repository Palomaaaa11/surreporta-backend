require('dotenv').config();
const path = require('express');

const express = require('express');
const app = express();
const puerto = process.env.PUERTO;

const apiRouter = require('./api/apimain');

app.use(express.json());

app.use("/api", apiRouter);



app.listen(puerto, function(error) {
    if (error){
        console.error(error);
        process.exit(1);
    }
  console.log(`Servidor corriendo en el puerto  ${puerto}`);
});
