require('dotenv').config();

const express = require('express');
const app = express();
const puerto = process.env.PUERTO;

const apiRouter = require('./api/apimain');



app.listen(puerto, function(error) {
    if (error){
        console.error(error);
        process.exit(1);
    }
  console.log(`Servidor corriendo en el puerto  ${puerto}`);
});
