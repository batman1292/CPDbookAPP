// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/',function(req, res) {
  // req.getConnection(function(err,conn){
  //
  //       if (err) return next("Cannot Connect");
  //
  //       var query = conn.query('SELECT * FROM BOOK',function(err,rows){
  //
  //           if(err){
  //               console.log(err);
  //               return next("Mysql error, check your query");
  //           }
  //           console.log(rows);
  //           res.render('index', { title: '123' });
  //
  //        });
  //
  //   });
// });
//
// router.get('/123', function(req, res) {
//   res.render('index', { title: '123' });
// });

exports.index = function(req, res) {
  // res.render('index', { title: '123' });
  req.getConnection(function(err,connection){

    connection.query('SELECT * FROM BOOK LEFT JOIN BOOK_AUTHOR ON BOOK.BookID = BOOK_AUTHOR.BookID LEFT Join AUTHOR ON BOOK_AUTHOR.AuthorID = AUTHOR.AuthorID',function(err,rows){

      if(err){
        console.log("Error Selecting : %s ",err );
      }
      console.log(rows);
      // res.render('index', {data : JSON.stringify(rows)});
      res.render('index', {data : rows});

    });

  });
};

exports.bookdetail = function(req, res) {
  // res.render('index', { title: '123' });
  var query1 = 'SELECT * FROM BOOK LEFT JOIN BOOK_AUTHOR ON BOOK.BookID = BOOK_AUTHOR.BookID LEFT Join AUTHOR ON BOOK_AUTHOR.AuthorID = AUTHOR.AuthorID LEFT Join BOOK_PUBLISHER ON BOOK.BookID = BOOK_PUBLISHER.BookID LEFT Join PUBLISHER ON BOOK_PUBLISHER.PublisherID = PUBLISHER.PublisherID WHERE BOOK.BookID = '+req.params.BookID
  req.getConnection(function(err,connection){

    connection.query(query1+'; SELECT * FROM SUBJECT' ,function(err,rows){

      if(err){
        console.log("Error Selecting : %s ",err );
      }
      console.log(rows[1]);
      // res.render('index', {data : JSON.stringify(rows)});
      res.render('detail', {data : rows[0], bookChapter : rows[1]});
      // datas : rows;
    });
    // console.log(datas);
    // res.render('detail', {data : datas});
  });
};
// module.exports = router;
