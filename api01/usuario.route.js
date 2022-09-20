const router = require('express-promise-router')();
const usuarioController = require('./usuario.controller');

router.post('/', usuarioController.post);

router.get('/', usuarioController.getAll);

router.get('/valida/:id/:sh', usuarioController.valida);

router.get('/perfis', usuarioController.getPerfis);

router.get('/:id', usuarioController.getById);

router.get('/matricula/:id', usuarioController.getByMatricula);

router.put('/:id', usuarioController.put);

router.delete('/:id', usuarioController.delete);

router.get('/log/:alvo/:id', usuarioController.getLog);

module.exports = router;