import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
  multipleStatements: true
})

const listBook = (req, res) => {
  const sql = "SELECT * FROM books"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}

const searchBook = (req, res) => {
  const bid = req.body.bid
  const sql = "SELECT * FROM books WHERE bookID = ?"
  db.query(sql, bid, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}

const addBook = (req, res) => {
  const sql = "INSERT INTO books (bookID, bookName, authorName, category, year, rackNo, floor) VALUES (?)"
  const values = [
    req.body.bookID,
    req.body.bookName,
    req.body.authorName,
    req.body.category,
    req.body.year,
    req.body.rackNo,
    req.body.floor
  ]
  db.query(sql, [values], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, message: "Book Added!", data})
  })
}

const findBook = (req, res) => {
  const sql = "SELECT * FROM books WHERE bookID = ?"
  const bookID = req.params.bookID
  db.query(sql, bookID, (e, data) => {
    if(e) return res.json(e)
    return res.json(data)
  })
}

const countBook = (req, res) => {
  const sql = "SELECT COUNT(*) FROM books"
  const bookID = req.params.bookID
  db.query(sql, bookID, (e, data) => {
    if(e) return res.json(e)
    return res.json(data)
  })
}

const updateBook = (req, res) => {
  const sql = "UPDATE `books` SET `bookID` = ?, `bookName` = ?, `authorName` = ?, `category` = ?, `year` = ?, `rackNo` = ?, `floor` = ? WHERE `books`.`bookID` = ?"
  const values = [
    req.body.bookID,
    req.body.bookName,
    req.body.authorName,
    req.body.category,
    req.body.year,
    req.body.rackNo,
    req.body.floor
  ]
  const bookID = req.params.bookID
  db.query(sql, [...values, bookID], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, message: "Book Updated!", data})
  })
}

const deleteBook = (req, res) => {
  const sql = "DELETE FROM books WHERE bookID = ?"
  const bookID = req.params.bookID
  db.query(sql, bookID, (e) => {
    if(e) {
      res.json({success: false, message: "Error!"});
      console.log(e)
  }
  return res.json({success: true, message: "Book Removed!"})
  })
}

const issueBook = (req, res) => {
  const sql = ["INSERT INTO issue (sid, bookId, book_status, fine, issue_date, return_date) VALUES (?, CURRENT_DATE(), DATE_ADD(CURRENT_DATE(), INTERVAL 10 DAY))",
    "UPDATE students SET Book_status = 'Yes' WHERE Sid IN (SELECT sid FROM issue)"]
  const values = [
    req.body.fineStuId,
    req.body.bookID,
    req.body.status,
    req.body.fine
  ]
  db.query(sql.join(';'), [values], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, message: "Added!", data})
  })
}

const returnBook = (req, res) => {
  const sql = "UPDATE issue SET book_status = 'Returned', return_date = CURRENT_DATE() WHERE sid = ? AND bookId = ?"
  const sid = req.body.returnSID
  const bid =  req.body.returnBID
  db.query(sql, [sid, bid], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    if(data.length>0) 
      return res.json({success: true, message: "Submitted!", data})
    return res.json({success: false, message: "Check Correct Data!", data})
  })
}

const fineBook = (req, res) => {
  const sql = ["SELECT bookId, (cast(CURRENT_DATE() as date) - cast(return_date as date) + fine) * 2 as fine FROM issue WHERE return_date < CURRENT_DATE() AND sid = ? AND book_status = 'Issued'",
  "SELECT SUM(cast(CURRENT_DATE() as date) - cast(return_date as date) + fine) * 2 as totalFine FROM issue WHERE return_date < CURRENT_DATE() AND sid = ? AND book_status = 'Issued'"]
  const values = [
    req.body.stu_ID
  ]
  db.query(sql.join(';'), [values, values], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, data})
  })
}

const issueBookList = (req, res) => {
  const sql = "SELECT * FROM issue WHERE book_status = 'Issued' ORDER BY issue_date DESC LIMIT 3"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    else {
      res.json(data) 
      console.log(data)
    }
  })
}

const bookStatusCount = (req, res) => {
  const sql = ["SELECT COUNT(*) as issueTotal FROM issue WHERE book_status ='Issued'", "SELECT COUNT(*) as returnTotal FROM issue WHERE book_status ='Returned'"]
  db.query(sql.join(';'), (e, data) => {
    if(e) return res.json("Error")
    else {
      res.json(data) 
      console.log(data)
    }
  })
}


export {addBook, searchBook, listBook, findBook, countBook, updateBook, deleteBook, issueBook, returnBook,fineBook, issueBookList, bookStatusCount}