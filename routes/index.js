var sqlite3 = require('sqlite3').verbose();
var dbPath = './models/data.db';
var db = new sqlite3.Database(dbPath);

exports.index = function(req, res) {
  var query = "SELECT * FROM BOOK";
  db.all(query,
    function(err, row){
  	  console.log({row});
      res.render('index', {data : {row} });
    }
  );
};

exports.bookdetail = function(req, res) {
  var query = "SELECT * FROM BOOK WHERE ID = "+req.params.BookID;
  var book_data;
  db.get(query,
    function(err, row){
      book_data = row;
      var query2 = "SELECT * FROM CHAPTER WHERE BOOK_ID = "+req.params.BookID;
      db.all(query2,
        function(err, row2){
          // console.log(book_data);
          // console.log(row2);
          res.render('detail', {data : {book_data}, bookChapter : {row2}});
        }
      );
    }
  );

//   // res.render('index', { title: '123' });
//   var query1 = 'SELECT * FROM BOOK LEFT JOIN BOOK_AUTHOR ON BOOK.BookID = BOOK_AUTHOR.BookID LEFT Join AUTHOR ON BOOK_AUTHOR.AuthorID = AUTHOR.AuthorID LEFT Join BOOK_PUBLISHER ON BOOK.BookID = BOOK_PUBLISHER.BookID LEFT Join PUBLISHER ON BOOK_PUBLISHER.PublisherID = PUBLISHER.PublisherID WHERE BOOK.BookID = '+req.params.BookID
//   req.getConnection(function(err,connection){
//
//     connection.query(query1+'; SELECT * FROM SUBJECT' ,function(err,rows){
//
//       if(err){
//         console.log("Error Selecting : %s ",err );
//       }
//       console.log(rows[1]);
//       // res.render('index', {data : JSON.stringify(rows)});
//       res.render('detail', {data : rows[0], bookChapter : rows[1]});
//       // datas : rows;
//     });
//     // console.log(datas);
//     // res.render('detail', {data : datas});
//   });
};
// module.exports = router;
