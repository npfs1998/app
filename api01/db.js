const { Pool } = require('pg');

const url = 'postgres://trabalho:123456@db01/trabalho';

const pool = new Pool({
    connectionString: url
});

pool.on('connect', () => {
    console.log('Base de Dados conectada com sucesso!');
  });

module.exports = {
    query: (text, params) => pool.query(text, params)
};