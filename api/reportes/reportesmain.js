const router = require("express").Router();
const fileUpload = require('express-fileupload');
const path = require("path");
const db = require('../../conexion');

router.use(fileUpload());

const dirArchivos = path.join(__dirname, "..", "..", "archivos");



router.get("/", function(req, res, next){

    const sql = 'SELECT r.* , u.nombre AS nombre_usuario FROM reportes AS r JOIN usuarios AS u ON r.id_usuario = u.id_usuario ORDER BY r.fecha_creacion DESC';

    db.query(sql)
    .then((resultado) => {
        res.status(200).json(resultado);
    })
    .catch((error) => {
        console.error("Error al obtener los reportes: ", error);
        res.status(500).send("Error al obtener los reportes");
    });
});

router.post("/", function(req, res, next){

    const { titulo, descripcion, longitud, latitud, direccion, id_usuario, id_categoria} = req.body;

    let nombreImg = null;

    if(req.files && req.files.imagen){
        const imagen = req.files.imagen;
        nombreImg = Date.now() + "_" + imagen.name;
        const rutaImg = path.join(dirArchivos, nombreImg);

        imagen.mv(rutaImg, function(error) {
            if (error) {
                console.error("Error al guardar la imagen: ", error);
                return res.status(500).send("Error al guardar la imagen");
            }
        });
    }

    let sql = 'INSERT INTO reportes (titulo, descripcion, longitud, latitud, direccion, imagen, fecha_creacion, id_usuario, id_categoria) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)';

    const valores = [titulo, descripcion, longitud, latitud, direccion, nombreImg, id_usuario, id_categoria];

    db.query(sql, valores)
    .then((resultado) => {
        res.status(201).send("Reporte creado correctamente");
    })
    .catch((error) => {
        console.error("Error al crear el reporte: ", error);
        res.status(500).send("Error al crear el reporte");
    });
});

router.put("/:id", function(req, res, next){
    const { id } = req.params;
    const { titulo, descripcion, longitud, latitud, direccion, id_categoria} = req.body;

    db.query('SELECT * FROM reportes WHERE id_reporte = ?', [id]) 
    .then((resultado) => {
        if (resultado.length === 0) return res.status(404).send("Reporte no encontrado");
        const reporteExistente = resultado[0];

        if (reporteExistente.id_usuario != id_usuario) {
            return res.status(403).send("No tienes permiso para actualizar este reporte");
        }

        let nombreImg = reporteExistente.imagen;

        if(req.files?.imagen){
            const imagen = req.files.imagen;
            nombreImg = Date.now() + "_" + imagen.name;
            const rutaImg = path.join(dirArchivos, nombreImg);

            imagen.mv(rutaImg, function(error) {
                if (error) {
                    console.error("Error al guardar la imagen: ", error);
                    return res.status(500).send("Error al guardar la imagen");
                }
            });
        }

        const sql = 'UPDATE reportes SET titulo = ?, descripcion = ?, longitud = ?, latitud = ?, direccion = ?, imagen = ?, id_categoria = ? WHERE id_reporte = ?';

        const valores = [titulo, descripcion, longitud, latitud, direccion, nombreImg, id_categoria, id];
        db.query(sql, valores)
        .then(() => {
            res.status(200).send("Reporte actualizado correctamente");
        })
        .catch((error) => {
            console.error("Error al actualizar el reporte: ", error);
            res.status(500).send("Error al actualizar el reporte");
        });


    });
});


router.delete("/:id", function(req, res, next){
    const { id } = req.params;
    const { id_usuario } = req.body;

    db.query('SELECT * FROM reportes WHERE id_reporte = ?', [id]) 
    .then((resultado) => {
        if (resultado.length === 0) return res.status(404).send("Reporte no encontrado");
        const reporteExistente = resultado[0];

        if (reporteExistente.id_usuario != id_usuario) {
            return res.status(403).send("No tienes permiso para eliminar este reporte");
        }

        const sql = 'DELETE FROM reportes WHERE id_reporte = ?';
        db.query(sql, [id])
        .then(() => {
            res.status(200).send("Reporte eliminado correctamente");
        })
        .catch((error) => {
            console.error("Error al eliminar el reporte: ", error);
            res.status(500).send("Error al eliminar el reporte");
        });

});
});

module.exports = router;