const router = require('express-promise-router')();
const acaoController = require('./acao.controller');

router.post('/', acaoController.post);

router.get('/', acaoController.getAll);

router.get('/:id', acaoController.getById);

router.put('/:id', acaoController.put);

router.delete('/:id', acaoController.delete);

module.exports = router;
