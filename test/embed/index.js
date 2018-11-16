const Db = require('../../server/embed/');
//import Db from '../../server/embed/index.js' ;
const db = new Db.CategoryDB();
const should = require('should');

describe("Database EMBED : CRUD", () => {

  const category = { 'cat_id' : 1, 'cat_name' : 'forest'}; 

  describe("Number! to Number!", ()=> {
    it("should check number by number", ()=>{
       let one = 1;
       let two = 2;
       let once = 1;
       one.should.eql.once;
       one.should.not.eql.two;
    });
  });

  describe("SQL Create: ", ()=>{
    it("should insert a new element ", ()=>{
      const how_many = db.count();
      db.add( category );
      db.count().should.not.eql.how_many;
    });
  });

  describe("SQL Retrieve: ", ()=>{
    it("should return the element ", async ()=>{
      const how_many = await db.count();
      const all_of_them = await db.retrieveAll( category );
      all_of_them.length.should.not.eql.how_many;
    });
  });

/*
  describe("SQL Update: ", ()=>{
    it("should update the element ", ()=>{
      const how_many = db.count();
      user[1] = 'robin@yahoo.com';
      db.update( user );
      db.count().should.eql.how_many;
    });
  });
*/
/*
  describe("SQL Delete: ", ()=>{
    it("should remove the element ", ()=>{
      const how_many = db.count();
      db.remove( category );
      db.count().should.not.eql.how_many;
    });
  });

*/
});
