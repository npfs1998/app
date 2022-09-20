const db = require("./db");
const util = require("./util");

exports.post = async (req, res) => {
    var { matricula, nome, senha, perfil, modificador } = req.body;
    senha = util.encripta(senha);
    const response = await db.query(
       'INSERT INTO usuario (matricula, nome, senha, perfil, modificador) VALUES ($1, $2, $3, $4, $5)',
       [matricula, nome, senha, perfil, modificador]);
   
    return res.status(201).send({message: 'Usuário incluído!' });
};

exports.valida = async (req, res) => {
    const Id = parseFloat(req.params.id);
    const Sh = util.valida(req.params.sh);
  
    var _sh = util.encripta(Sh);
    const retorno = await db.query("SELECT 'ok' as ret FROM usuario WHERE senha = $1 and id = $2", [_sh, Id]);
    res.status(200).send(retorno.rows);
};

exports.getAll = async (req, res) => {
    const _usuarios = await db.query(
        'SELECT * FROM usuario ORDER BY nome ASC');
    return res.status(200).send(_usuarios.rows);
};

exports.getById = async (req, res) => {
    const Id = parseFloat(req.params.id);
    const _usuario = await db.query(
      'SELECT * FROM usuario WHERE id = $1', [Id]);
    return res.status(200).send(_usuario.rows);
};

exports.getByMatricula = async (req, res) => {
    const Id = req.params.id;
    const _usuario = await db.query(
      'SELECT * FROM usuario WHERE matricula = $1', [Id]);
    return res.status(200).send(_usuario.rows);
};

exports.put = async (req, res) => {
    if (!req.body.matricula) {
        res.status(400).send({ message: 'Campo(s) vazio(s)!' });
    }

    const Id = parseFloat(req.params.id);

    var { matricula, nome, senha, situacao, perfil, modificador } = req.body;
    if (String(senha).length < 50)
        senha = util.encripta(senha);

    const response = await db.query(
      'UPDATE usuario SET matricula = $1, nome = $2, senha = $3, situacao = $4, perfil = $5, modificador = $6 WHERE id = $7',
      [matricula, nome, senha, situacao, perfil, modificador, Id]);

    res.status(200).send({ message: 'Usuário atualizado!' });
};

exports.delete = async (req, res) => {
    const Id = parseFloat(req.params.id);
    const retorno = await db.query('SELECT * FROM usuario WHERE id = $1', [Id]);
    const response = await db.query('DELETE FROM usuario WHERE id = $1', [Id]);
    const _usuario = retorno.rows;
    res.status(200).send({ message: 'Usuario excluído!', _usuario });
};

exports.getPerfis = async (req, res) => {
    const _perfis = await db.query(
        'SELECT * FROM perfil ORDER BY descricao ASC');
      
    return res.status(200).send(_perfis.rows);
};
  
exports.getLog = async (req, res) => {
    const alvo = String(req.params.alvo).toUpperCase();
    const id = parseFloat(req.params.id);
    const _logs = await db.query(
    'SELECT a.*, b.matricula, b.nome FROM log a, usuario b WHERE b.id = a.usuario AND a.tabela = $1 AND a.idtabela = $2 ORDER BY a.id DESC', 
                [alvo, id]);
  
    return res.status(200).send(_logs.rows);
};