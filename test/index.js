const db = require('../server').DB;
const should = require('should');

describe("Database access : CRUD", () => {

  const user = ['Batman','bat@gmail.com']; 

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
      db.insert( user );
      db.count().should.not.eql.how_many;
    });
  });
  describe("SQL Retrieve: ", ()=>{
    it("should return the element ", async ()=>{
      const how_many =  await db.count();
console.log("retrieve: many: "+how_many);
console.log("retrieve: many: "+JSON.stringify(how_many));
      const all_of_them =  await db.viewAll( user );
      all_of_them.length.should.not.eql.how_many;
      all_of_them.length.should.eql.how_many;
console.log("retrieve: all: "+JSON.stringify(all_of_them));
    });
  });
  describe("SQL Update: ", ()=>{
    it("should update the element ", ()=>{
      const how_many = db.count();
      user[1] = 'robin@yahoo.com';
      db.update( user );
      db.count().should.eql.how_many;
    });
  });
  describe("SQL Delete: ", ()=>{
    it("should remove the element ", ()=>{
      const how_many = db.count();
      db.remove( [ user[0] ] );
      db.count().should.not.eql.how_many;
    });
  });

  after("Database Pooling Connections Closing..", ()=>{
    db.end();
  });
});
