require('dotenv').config();
const path = require('express');
const cors = require("cors");

const express = require('express');
const app = express();
const puerto = process.env.PUERTO;
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

const apiRouter = require('./api/apimain');



app.use("/api", apiRouter);




app.listen(puerto, function(error) {
    if (error){
        console.error(error);
        process.exit(1);
    }
  console.log(`Servidor corriendo en el puerto  ${puerto}`);
});
