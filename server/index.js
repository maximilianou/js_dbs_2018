const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postrgresql://educacion:educacion@localhost:5432/instrument_db',
})

class DB {

  static async view(){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query('SELECT * FROM users WHERE u_id = $1', [1]);
      return rows[0];
    }finally{
      await client.release();
    }
  }
  static async count(){
    let client = await pool.connect(); 
    try{
      const many_ones = await client.query(' SELECT COUNT(*) FROM users ')
      return many_ones.rows[0].count;
    }finally{
      await client.release();
    }
  }
  static async viewAll(){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query('SELECT * FROM users ');
      return rows;
    }finally{
      await client.release();
    }
  }
  
  static async viewByName( param ){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query('SELECT * FROM users WHERE u_name = $1', param );
      return rows[0];
    }finally{
      await client.release();
    }
  }
  static async insert( parameter ){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query(' INSERT INTO users ( u_name, u_email )VALUES( $1, $2 ) ', parameter )
      return JSON.stringify(rows); 
    }finally{
      await client.release();
    }
  }
  static async update( parameter ){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query(' UPDATE users set u_email = $2 WHERE u_name =  $1 ', parameter )
      return JSON.stringify(rows); 
    }finally{
      await client.release();
    }
  }
  static async remove( parameter ){
    let client = await pool.connect(); 
    try{
      const { rows } = await client.query(' DELETE FROM users WHERE u_name = $1 ', parameter );
      return JSON.stringify(rows);
    }finally{
      await client.release();
    }
  }
  static async end(){
    console.log("END::Total Count: "+pool.totalCount);
    console.log("END:: Idle Count: "+pool.idleCount);
    //pool.end() ;
  }
  static testDB(){
    const oneUser = [ 'test01', 'test01@u.com' ];
    (async () => {
       console.log( "DB::test::insert    ::::" + JSON.stringify( await DB.insert(oneUser) ) );
       console.log( "DB::test::viewByName::::" + JSON.stringify( await DB.viewByName( [ oneUser[0] ]) ) );
       oneUser[1] = 'test____01@u.com'; 
       console.log( "DB::test::update    ::::" + JSON.stringify( await DB.update(oneUser) ) ); 
       console.log( "DB::test::viewByName::::" + JSON.stringify( await DB.viewByName( [ oneUser[0] ]) ) );
       console.log( "DB::test::remove    ::::" + JSON.stringify( await DB.remove( [ oneUser[0] ] ) ) );
       console.log( "DB::test::viewByName::::" + JSON.stringify( await DB.viewByName( [ oneUser[0] ]) ) );
    })(); 
  }

}

module.exports = { DB: DB};
