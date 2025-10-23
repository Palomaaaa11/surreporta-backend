const router = require('express').Router();
const db = require('../../conexion');

const { hashPass } = require("@damianegreco/hashpass");

const loginRouter = require("./login");

router.use("/login", loginRouter);


router.post("/", function(req, res, next){

    const {nombre, email, pass} = req.body;

    let sql = 'INSERT INTO usuarios (nombre, email, pass)  VALUES (?, ?, ?)';

    //const passHasheada = hashPass(pass);

    db.query(sql, [nombre, email, pass])
    .then(() =>{
        res.status(201).send("Usuario guardado");
    })
    .catch((error) =>{
        console.error(error);
        res.status(500).send("Ocurrió un error");
    })
})


router.get("/", function(req, res, next){
    let sql= 'SELECT * FROM usuarios';

    db.query(sql)
    .then(([usuarios]) => {
        res.status.json({usuarios})
    })
    .catch((error) =>{
        console.error(error);
        res.status(500).send("Ocurrió un error");
    })
})


NO ME ANDA EL NPMRUNDEV


module.exports = router;