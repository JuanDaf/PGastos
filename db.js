const mysql = require('mysql');
const { promisify }= require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Conexion cerrada.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Error de conexion');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Conexion rechazada');
    }
  }

  if (connection) connection.release();
  console.log('Conectado a la BD');

  return;
});

//pool query/// coolback a promesas//
pool.query = promisify(pool.query);

module.exports = pool;
