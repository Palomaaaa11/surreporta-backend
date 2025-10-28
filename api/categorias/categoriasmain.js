const router = require("express").Router();

const db = require('../../conexion');

router.get("/", function(req, res, next){
    const sql = "SELECT * FROM categorias";

    db.query(sql)
    .then(([resultado]) => {
        res.status(200).json(resultado);
    })
    .catch((error) => {
        console.error("Error al obtener las categorias: ", error);
        res.status(500).send("Error al obtener las categorias");
    });
});

router.post("/", function(req, res, next){
    const { nombre } = req.body;
    const sql = "INSERT INTO categorias (nombre) VALUES (?)";

    db.query(sql, [nombre])
    .then(([resultado]) => {
        res.status(201).json({ id_categoria: resultado.insertId, nombre });
    })
    .catch((error) => {
        console.error("Error al crear la categoria: ", error);
        res.status(500).send("Error al crear la categoria");
    });
});

router.put("/:id_categoria", function(req, res, next){
    const { id_categoria } = req.params;
    const { nombre } = req.body;
    const sql = "UPDATE categorias SET nombre = ? WHERE id_categoria = ?";

    db.query(sql, [nombre, id_categoria])
    .then(() => {
        res.status(200).send("Categoria actualizada correctamente");
    })
    .catch((error) => {
        console.error("Error al actualizar la categoria: ", error);
        res.status(500).send("Error al actualizar la categoria");
    });
});

router.delete("/:id_categoria", function(req, res, next){
    const { id_categoria } = req.params;
    const sql = "DELETE FROM categorias WHERE id_categoria = ?";

    db.query(sql, [id_categoria])
    .then(() => {
        res.status(200).send("Categoria eliminada correctamente");
    })
    .catch((error) => {
        console.error("Error al eliminar la categoria: ", error);
        res.status(500).send("Error al eliminar la categoria");
    });
});


module.exports = router;