/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("Routing tests", function() {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function() {
        test("Test POST /api/books with title", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "Title new Book"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "response should be an object");
              assert.property(res.body, "_id");
              assert.property(res.body, "title");
              assert.equal(res.body.title, "Title new Book");
              done();
            });
        });

        test("Test POST /api/books with no title given", function(done) {
          chai
            .request(server)
            .post("/api/books")
            .end(function(err, res) {
              assert.equal(res.status, 400);
              assert.equal(res.error.text, "missing title");
              done();
            });
        });
      }
    );

    suite("GET /api/books => array of books", function() {
      before(function() {
        chai
          .request(server)
          .post("/api/books")
          .send({
            title: "Title 1"
          });

        chai
          .request(server)
          .post("/api/books")
          .send({
            title: "Title 2"
          });
      });

      test("Test GET /api/books", function(done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, "response should be an array");
            assert.isAtLeast(res.body.length, 2);
            assert.property(
              res.body[0],
              "commentcount",
              "Books in array should contain commentcount"
            );
            assert.property(
              res.body[0],
              "title",
              "Books in array should contain title"
            );
            assert.property(
              res.body[0],
              "_id",
              "Books in array should contain _id"
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function() {
      let bookid;

      before(function() {
        chai
          .request(server)
          .post("/api/books")
          .send({
            title: "Title 3"
          })
          .end(function(err, res) {
            bookid = res.body._id;
          });
      });

      test("Test GET /api/books/[id] with id not in db", function(done) {
        chai
          .request(server)
          .get("/api/books/notvalidid")
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.error.text, "no valid id provided");
            done();
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function(done) {
        chai
          .request(server)
          .get("/api/books/" + bookid)
          .send({
            id: bookid
          })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, "response should be an object");
            assert.property(res.body, "_id");
            assert.property(res.body, "title");
            assert.property(res.body, "comments");
            assert.equal(res.body._id, bookid);
            done();
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function() {
        let bookid;

        before(function() {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "Title 4"
            })
            .end(function(err, res) {
              bookid = res.body._id;
            });
        });

        test("Test POST /api/books/[id] with comment", function(done) {
          chai
            .request(server)
            .post("/api/books/" + bookid)
            .send({
              comment: "Comment Title 3"
            })
            .end(function(err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, "response should be an object");
              assert.property(res.body, "_id");
              assert.property(res.body, "title");
              assert.property(res.body, "comments");
              assert.equal(res.body._id, bookid);
              done();
            });
        });
      }
    );
  });
});
