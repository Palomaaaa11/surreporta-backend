const express =require('express')
const router = express.Router();

const reportesRouter = require('./reportes/reportesmain');
const usuariosRouter = require('./usuarios/usuariosmain');
const categoriasRouter = require('./categorias/categoriasmain');

router.use('/categorias', categoriasRouter);
router.use('/reportes', reportesRouter);
router.use('/usuarios', usuariosRouter);


module.exports = router;