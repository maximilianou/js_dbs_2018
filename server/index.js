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
  static testDB(){
    //const oneUser = { 'u_name': 'test01', 'u_email': 'test01@u.com' };
    const oneUser = [ 'test01', 'test01@u.com' ];
    (async () => {
    
       console.log( "DB::test::insert::::" + JSON.stringify( DB.insert(oneUser) ) );
       oneUser.u_email = 'test_01@u.com'; 
       console.log( "DB::test::update::::" + JSON.stringify( DB.update(oneUser) ) ); 
       console.log( "DB::test::remove::::" + JSON.stringify( DB.remove( [ oneUser[0] ] ) ) );
    })(); 
  }

}

module.exports = { DB: DB};
