
//mysql database file

const mysql = require("mysql");
const con = mysql.createConnection({
  multipleStatements: true,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'uber'
})
con.connect((err, rows, field) => {
  if (err)
    console.log(err)
  else
    console.log("connected");
})

// Query function
exports.dbHandlerPromise = (query, values) => {
  return new Promise((resolve, reject) => {
    con.query(query, values, (err, result) => {
      //  if(err)
      //  reject(err)
      //   console.log(err);
      resolve(result)

    })
  })
}
