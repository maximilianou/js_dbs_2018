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
