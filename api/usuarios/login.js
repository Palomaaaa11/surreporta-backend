const router = require('express').Router();

const {TOKEN_SECRET} = process.env;

const {verificarPass, generarToken} = require("@damianegreco/hashpass")

const db = require('../../conexion');

router.post("/", function(req, res, next){
    const {email, pass} = req.body;

    let sql = "SELECT id_usuario, nombre, email, pass, rol FROM usuarios WHERE email = ?";

    db.query(sql, [user])
    .then(([usuarios]) =>{
        if(usuarios.length === 1){
            const usuario = usuarios[0];
            if(verificarPass(pass, usuario.pass)){
               
                const datos ={
                    id: usuario.id,
                    nombre : usuario.nombre,
                    email : usuario.email,
                    rol : usuario.rol
                }

                const token = generarToken(TOKEN_SECRET, 6, datos);

                res.json({status:"ok", token})
            }else{
                console.log("Contraseña incorrecta");
                res.status(401).send("usuario o contraseña incorrecto");
            }
        }else{
            console.log("usuario no encontrado");
            
        }
    })
})

module.exports = router;