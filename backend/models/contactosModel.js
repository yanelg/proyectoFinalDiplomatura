var pool = require('./bd');

async function getContactos() {
    //FIXME corregir esto en la base de datos ya que la tabla contactos no existe
    var query = 'select * from contactos';
    var rows = await pool.query(query);
    return rows;
}

module.exports = { getContactos }