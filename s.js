var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_new_password",
  database: "medical_history"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO users(first_name,last_name,mob_no,user_name, password,family_id,age,blood_group) VALUES ('omkar','podey',855,'omk','omk','',20,'O+')";

//  var sql = "CREATE TABLE IF NOT EXISTS `users` (`id` int(5) NOT NULL AUTO_INCREMENT,`first_name` text NOT NULL,`last_name` text NOT NULL,`mob_no` int(11) NOT NULL,`user_name` varchar(20) NOT NULL,`password` varchar(15) NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("data created");
  });
});
