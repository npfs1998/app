const express = require('express');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const cors = require('cors');

const acaoRoute = require('./acao.route');
const usuarioRoute = require('./usuario.route');

//const db = require('./db');

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(morgan('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
app.get('/', (req, res) => res.send('< Api-01 >'));

app.get('/usuario', async (req, res) => {
  const usuarios = await db.select().from('usuario')
  res.json(usuarios)
})

app.post('/usuario', async (req, res) => {
  var senha = util.encripta(req.body.senha);
  req.body.senha = senha;
  const usuario = await db('usuario').insert({ nome: req.body.nome }).returning('*')
  res.json(usuario)
})
*/

app.use('/acao', acaoRoute);
app.use('/usuario', usuarioRoute);

app.listen(PORT, () => console.log(`Executando em http://localhost:${PORT}`));

module.exports = app;
