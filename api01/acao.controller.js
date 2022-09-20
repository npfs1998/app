const db = require("./db");

exports.post = async (req, res) => {
    const { usuario, descricao, observacao, modificador } = req.body;
    const _acao = await db.query(
      'INSERT INTO acao (usuario, descricao, observacao, modificador) VALUES ($1, $2, $3, $4)',
        [usuario, descricao, observacao, modificador]);
    res.status(201).send({message: 'Acao incluída!' });
};

exports.getAll = async (req, res) => {
    const _acoes = await db.query(
        'SELECT a.*, b.matricula, b.nome FROM acao a, ' +
           'usuario b WHERE b.id = a.usuario ORDER BY a.id ASC');
    return res.status(200).send(_acoes.rows);
};

exports.getById = async (req, res) => {
    const Id = parseFloat(req.params.id);
    const _acao = await db.query(
        'SELECT a.*, b.matricula, b.nome FROM acao a, usuario b WHERE b.id = a.usuario AND a.id = $1',
            [Id] );
    return res.status(200).send(_acao.rows);
};

exports.put = async (req, res) => {
    if (!req.body.descricao) {
        res.status(400).send({ message: 'Campo(s) vazio(s)!' });
    }

    const Id = parseFloat(req.params.id);
    const { descricao, observacao, situacao, modificador } = req.body;

    const _acao1 = await db.query(
      'UPDATE acao SET descricao = $1, observacao = $2, ' + 
          'situacao = $3, modificador = $4 WHERE id = $5',
      [descricao, observacao, situacao, modificador, Id]);
    
    const _acao = req.body;
      
    res.status(200).send({ message: 'Acao atualizada!',  _acao});
};

exports.delete = async (req, res) => {
    const Id = parseFloat(req.params.id);
    const _acao1 = await db.query('SELECT a.*, b.matricula, b.nome FROM acao a, usuario b WHERE b.id = a.usuario AND a.id = $1', [Id]);
    const response = await db.query('DELETE FROM acao WHERE id = $1', [Id]);
    const _acao = _acao1.rows;
    res.status(200).send({ message: 'Acao excluída!', _acao });
};
