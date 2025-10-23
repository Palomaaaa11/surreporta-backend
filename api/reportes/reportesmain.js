const router = require("express").Router();
const fileUpload = require('express-fileupload');
const path = require("path");
const fs = require("fs")
const db = require('../../conexion');

const dirArchivos = path.join(__dirname, "..", "..", "archivos");

router.get("/archivo", function(req, res, next){
    
})
module.exports = router