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
