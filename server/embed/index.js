const Alasql = require('alasql');
//const category_db = new Alasql.Database();  

class CategoryDB{

  constructor(){
    console.log('CategoryDB.constructor()....................');
    this.category_db = new Alasql.Database();  
    this.category_db.exec(' CREATE TABLE IF NOT EXISTS category ( cat_id INT PRIMARY KEY, cat_name STRING UNIQUE  ) '); 
//    this.insert = this.category_db.compile('INSERT INTO category ( cat_id, cat_name )VALUES( :cat_id, :cat_name) ');
//    this.delete = this.category_db.compile(' DELETE FROM category WHERE cat_id = :cat_id ');
//    this.select = this.category_db.compile(' SELECT * FROM category ');
//    this.count = this.category_db.compile(' SELECT COUNT(*) FROM category ');
  }

  add( one ){
     this.insert(one); 
  }
  remove( one ){
     this.delete(one);
  }
  retrieveAll(){
     this.select();  
  }
  async count(){
    // this.count();
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
