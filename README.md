## Nodejs Database Connectivity OOP Javascript Postgresql Alasql

###  unit test mocha chai 

### EMbed Database Alasql

```javascript
const db = require('../server').DB;
const should = require('chai').should();

describe("Database access : CRUD", () => {

  const user = ['Batman','bat@gmail.com']; 

  describe("Number! to Number!", ()=> {
    it("should check number by number", ()=>{
       let one = 1;
       let two = 2;
       let once = 1;
       one.should.equal(once);
       one.should.not.equal(two);
    });
  });

  describe("SQL Create: ", ()=>{
    it("should insert a new element ", ()=>{
      const how_many = db.count();
      db.insert( user );
      db.count().should.not.equal(how_many);
    });
  });
  describe("SQL Retrieve: ", ()=>{
    it("should return the element ", async ()=>{
      const how_many =  await db.count();
      const all_of_them =  await db.viewAll( user );
      all_of_them.length.should.not.equal(how_many);
      console.log(all_of_them.length.should.not.equal(how_many));
      console.log("- - - - - length --  "+JSON.stringify(all_of_them.length));
      console.log("- - - - - - many --  "+JSON.stringify(how_many));
      all_of_them.length.should.equal(how_many);
      console.log(all_of_them.length.should.equal(how_many));
      console.log("retrieve: all: "+JSON.stringify(all_of_them));
    });
  });
  describe("SQL Update: ", ()=>{
    it("should update the element ", ()=>{
      const how_many = db.count();
      console.log("UPDATE:1::::::::::"+ JSON.stringify(how_many) );
      user[1] = 'robin@yahoo.com';
      db.update( user  );
      db.count().should.equal(how_many);
      console.log("UPDATE:2::::::::::"+ JSON.stringify(db.count()) );
    });
  });
  describe("SQL Delete: ", ()=>{
    it("should remove the element ", ()=>{
      const how_many = db.count();
      db.remove( [ user[0] ] );
      db.count().should.not.equal(how_many);
    });
  });
  describe("Test SQL DB: ", ()=>{
    it("should not throw an Error ", ()=>{
      db.testDB( );
    });
  });

  after("Database Pooling Connections Closing..", ()=>{
    db.end();
  });
});

```

```javascript
const Alasql = require('alasql');
//const category_db = new Alasql.Database();  

class CategoryDB{

  constructor(){
    console.log('CategoryDB.constructor()....................');
    this.category_db = new Alasql.Database();  
    this.category_db.exec(' CREATE TABLE IF NOT EXISTS category ( cat_id INT PRIMARY KEY, cat_name STRING UNIQUE  ) '); 
  }

  add( one ){
    this.category_db.exec('INSERT INTO category ( cat_id, cat_name )VALUES( :cat_id, :cat_name) ', one);
  }
  update( one ){
    this.category_db.exec('UPDATE category SET cat_name = :cat_name WHERE cat_id =  :cat_id ', one );
  }
  remove( one ){
    this.category_db.exec(' DELETE FROM category WHERE cat_id = :cat_id ', one);
  }
  async retrieveAll(){
    return await this.category_db.exec(' SELECT * FROM category ');
  }
  async count(){
    return await this.category_db.exec(' SELECT COUNT(*) size FROM category ');
  }
}
module.exports = { CategoryDB : CategoryDB };
/*
const db = new CategoryDB();
(async () => {
 console.log( "server/embed.js:: " + await db.count() );
 console.log( "server/embed.js:: " + (await db.count())[0].size );
 console.log( "server/embed.js:: " + JSON.stringify(  await db.count() ) );
})();
*/

```


### Posgresql Standalone Database

```javascript
const db = require('../server').DB;
const should = require('chai').should();

describe("Database access : CRUD", () => {

  const user = ['Batman','bat@gmail.com']; 

  describe("Number! to Number!", ()=> {
    it("should check number by number", ()=>{
       let one = 1;
       let two = 2;
       let once = 1;
       one.should.equal(once);
       one.should.not.equal(two);
    });
  });

  describe("SQL Create: ", ()=>{
    it("should insert a new element ", ()=>{
      const how_many = db.count();
      db.insert( user );
      db.count().should.not.equal(how_many);
    });
  });
  describe("SQL Retrieve: ", ()=>{
    it("should return the element ", async ()=>{
      const how_many =  await db.count();
      const all_of_them =  await db.viewAll( user );
      all_of_them.length.should.not.equal(how_many);
      console.log(all_of_them.length.should.not.equal(how_many));
      console.log("- - - - - length --  "+JSON.stringify(all_of_them.length));
      console.log("- - - - - - many --  "+JSON.stringify(how_many));
      all_of_them.length.should.equal(how_many);
      console.log(all_of_them.length.should.equal(how_many));
      console.log("retrieve: all: "+JSON.stringify(all_of_them));
    });
  });
  describe("SQL Update: ", ()=>{
    it("should update the element ", ()=>{
      const how_many = db.count();
      console.log("UPDATE:1::::::::::"+ JSON.stringify(how_many) );
      user[1] = 'robin@yahoo.com';
      db.update( user  );
      db.count().should.equal(how_many);
      console.log("UPDATE:2::::::::::"+ JSON.stringify(db.count()) );
    });
  });
  describe("SQL Delete: ", ()=>{
    it("should remove the element ", ()=>{
      const how_many = db.count();
      db.remove( [ user[0] ] );
      db.count().should.not.equal(how_many);
    });
  });
  describe("Test SQL DB: ", ()=>{
    it("should not throw an Error ", ()=>{
      db.testDB( );
    });
  });

  after("Database Pooling Connections Closing..", ()=>{
    db.end();
  });
});

```

```javascript
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

```