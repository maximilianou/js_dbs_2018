const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postrgresql://educacion:educacion@localhost:5432/instrument_db',
})

class DB {

  static async view(){
    const { rows } = await pool.query('SELECT * FROM users WHERE u_id = $1', [1])
    return rows[0];
  }
  static async count(){
    const many_ones = await pool.query(' SELECT COUNT(*) FROM users ')
    return many_ones.rows[0].count;
  }
  static async viewAll(){
    const { rows } = await pool.query('SELECT * FROM users ');
    return rows;
  }
  static async insert( parameter ){
    const { rows } = await pool.query(' INSERT INTO users ( u_name, u_email )VALUES( $1, $2 ) ', parameter )
    return JSON.stringify(rows); 
  }
  static async update( parameter ){
    const { rows } = await pool.query(' UPDATE users set u_email = $2 WHERE u_name =  $1 ', parameter )
    return JSON.stringify(rows); 
  }
  static async remove( parameter ){
    const { rows } = await pool.query(' DELETE FROM users WHERE u_name = $1 ', parameter );
    return JSON.stringify(rows);
  }
  static async end(){
    pool.end();
  }
}

module.exports = { DB: DB};
