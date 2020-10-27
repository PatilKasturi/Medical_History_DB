

exports.login = function(req, res){
   var message = '';
   var sess = req.session;

   if(req.method == "POST"){
     console.log("IN");

      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;

      var sql="SELECT p_id, first_name, last_name, user_name FROM users WHERE user_name='"+name+"' and password = '"+pass+"'";

      console.log(sql);
      db.query(sql, function(err, results){
         if(results.length){
            req.session.userId = results[0].p_id;
            req.session.user = results[0];
            console.log(results[0].p_id);
            res.redirect('/profile');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }

      });
   } else {
      res.render('index.ejs',{message: message});
   }
};


exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
       console.log("IN");
      var post  = req.body;
      console.log(post);
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      var fam =post.family_id;
      var age =post.age;
      var blood_group =post.blood_group.toUpperCase();
      console.log("IN");
    //  var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`,`family_id`,`age`,`blood_group`) VALUES ('" + fname + "','" + lname + "'," + mob + ",'" + name + "','" + pass + "','" + fam + "'," + age + ",'" + blood_group + "')";
      var sql = "INSERT INTO users(first_name,last_name,mob_no,user_name, password,family_id,age,blood_group) VALUES ('" + fname + "','" + lname + "'," + mob + ",'" + name + "','" + pass + "','" + fam + "'," + age + ",'" + blood_group + "')";

      var query = db.query(sql, function(err, result) {
         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      // console.log("NOPE");
      res.render('signup');

   }
};


exports.profile = function(req, res){

	var user =  req.session.user,
	userId = req.session.userId;
  //console.log('Profile');
	if(userId == null){
		res.redirect("/profile");
		return;
	}
 var dis;
 var acc;
  sql1= "SELECT problem_name,type,medication,date FROM problems WHERE p_id ='"+userId+"'";
  var query = db.query(sql1, function(err, results) {
    console.log(results);
  //  var rows = results;
     //message = "Success !! condition added";
    dis = results;
    // res.render('dis.ejs',{data: results,message: message});
  });
  var sql2= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
  var query = db.query(sql2, function(err, results) {
    console.log(results);
  //  var rows = results;
     //message = "Success !! condition added";
     acc = results;
    // res.render('acc.ejs',{data: results,message: message});
  });

  var sql= "SELECT first_name,last_name,blood_group,age from users WHERE p_id = '"+userId+"'";

	// var sql="SELECT `first_name` FROM `users` WHERE `p_id`='"+userId+"'";

	   db.query(sql, function(err, results){

		  // console.log(results);
    //   var row = results[0].first_name;
    //  console.log(row);
      var fam ;
      var sqli= "SELECT family_id FROM users WHERE p_id ='"+userId+"'";
      db.query(sqli,function(err,res11)
    {
         fam = res11[0].family_id;
         if(fam== '')
         {
           fam ="*##*";
         }
         var sqll= "SELECT distinct p.problem_name from problems p natural join users u where p.type = 'heridity' and u.family_id= '"+fam+"'";
         db.query(sqll,function(err,res2){
           res.render('profile.ejs', {data:results,data1:dis,data2:acc,data3:res2});


         });

    });


		});
};

exports.add = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
  var type= post.d;
  var name= post.name;
  var mname = post.mname;
  var date = post.date;
  var data;
//var name = post.fname;
  var sql1;
  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/home/dashboard");
    return;
  }


  var sql=" INSERT INTO problems(p_id,problem_name,type,medication,date) VALUES('"+userId+"','"+name+"','"+type+"','"+mname+"','"+date+"')";
  sql1= "SELECT problem_name,type,medication FROM problems WHERE p_id ='"+userId+"' ";
  var query1 = db.query(sql);

  var query = db.query(sql1, function(err, results) {
    console.log(results);
     //message = "Success !! condition added";
     res.render('dis.ejs',{message: message,data: results});
  });




}
else {
 sql1= "SELECT problem_name,type,medication FROM problems WHERE p_id ='"+userId+"'";
 var query = db.query(sql1, function(err, results) {
   console.log(results);
   message = "";
    //message = "Success !! condition added";
    res.render('dis.ejs',{message:message,data: results});
 });

}



};


exports.add1 = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
  var date= post.date;
  var name= post.aname;
  var part= post.part;
  //var data;
//var name = post.fname;
  var sql1;
  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/profile");
    return;
  }


  var sql=" INSERT INTO accidents(p_id,doa,a_name,injured_part) VALUES('"+userId+"','"+date+"','"+name+"','"+part+"')";
  sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
  var query1 = db.query(sql);

  var query = db.query(sql1, function(err, results) {
    console.log(results);
     //message = "Success !! condition added";
     res.render('acc.ejs',{message: message,data: results});
  });




}
else {
  sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
 var query = db.query(sql1, function(err, results) {
   console.log(results);
   message = "";
    //message = "Success !! condition added";
    res.render('acc.ejs',{message:message,data: results});
 });

}



};






exports.add2 = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
//  var date= post.date;
  var name= post.family_id;
  //var part= post.part;
  //var data;
//var name = post.fname;

  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/profile");
    return;
  }

  var sql2= "UPDATE users SET family_id = '"+name+"' WHERE p_id ='"+userId+"'";
  var query2 = db.query(sql2, function(err,result1){

  var sql= "SELECT family_id FROM users WHERE p_id ='"+userId+"'";
  var query1 = db.query(sql, function(err,result){

    console.log(result);
    if(result[0].family_id!=''){
      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '"+result[0].family_id+"'";

      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

         res.render('family.ejs',{name: result[0].family_id,data: results,message: message});
      });
    }


    else {

      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '*##*'";

      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

         res.render('family.ejs',{name: 'No id ',data: results,message: message});
      });


    }


  });

  });


}
else {

    var sql= "SELECT family_id FROM users WHERE p_id ='"+userId+"'";
    var query1 = db.query(sql, function(err,result){

      console.log(result);
      if(result[0].family_id!=''){
        var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '"+result[0].family_id+"'";

        var query = db.query(sql1, function(err, results) {
          console.log(results);
        //  var rows = results;
           //message = "Success !! condition added";

           res.render('family.ejs',{name: result[0].family_id,data: results,message: message});
        });
      }


      else {

        var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '*##*'";

        var query = db.query(sql1, function(err, results) {
          console.log(results);
        //  var rows = results;
           //message = "Success !! condition added";

           res.render('family.ejs',{name: 'No id ',data: results,message: message});
        });


      }


    });

}



};






exports.dis = function(req, res){
  var user =  req.session.user,
  userId = req.session.userId;
    var message = '';
//  res.render('dis',{message: message});
  sql1= "SELECT problem_name,type,medication,date FROM problems WHERE p_id ='"+userId+"'";
  var query = db.query(sql1, function(err, results) {
    console.log(results);
  //  var rows = results;
     //message = "Success !! condition added";

     res.render('dis.ejs',{data: results,message: message});
  });
};



exports.acc = function(req, res){
  var user =  req.session.user,
  userId = req.session.userId;
    var message = '';
//  res.render('dis',{message: message});
  var sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
  var query = db.query(sql1, function(err, results) {
    console.log(results);
  //  var rows = results;
     //message = "Success !! condition added";

     res.render('acc.ejs',{data: results,message: message});
  });
};





exports.family = function(req, res){
  var user =  req.session.user,
  userId = req.session.userId;
    var message = '';
//  res.render('dis',{message: message});
  var sql= "SELECT family_id FROM users WHERE p_id ='"+userId+"'";
  var query1 = db.query(sql, function(err,result){

    console.log(result);
    if(result[0].family_id==''){
      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '*##*'";
      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

           res.render('family.ejs',{name: "No ID",data: results,message: message});


      });

    }
    else {
      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '"+result[0].family_id+"'";
      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

           res.render('family.ejs',{name: result[0].family_id,data: results,message: message});


      });


    }
    //var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '"+result[0].family_id+"'";





  });


};














exports.remove = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
  var type= post.d;
  var name= post.name;
  var data;
//var name = post.fname;
  var sql1;
  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/profile");
    return;
  }

console.log('delete');
  //var sql="delete from problems where p_id = '"+userId+"')";
    var sql = "DELETE FROM problems WHERE p_id = '"+userId+"' and problem_name = '"+name+"'";
    var query1 = db.query(sql);

  sql1= "SELECT problem_name,type,medication,date FROM problems WHERE p_id ='"+userId+"'";

  var query = db.query(sql1, function(err, results) {
    console.log(results);
     //message = "Success !! condition added";
     res.render('dis.ejs',{message: message,data: results});
  });




}
else {
 sql1= "SELECT problem_name,type FROM problems WHERE p_id ='"+userId+"'";
 var query = db.query(sql1, function(err, results) {
   console.log(results);
   message = "";
    //message = "Success !! condition added";
    res.render('dis.ejs',{message:message,data: results});
 });

}



};




exports.remove1 = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
  var date= post.date;
  var name= post.aname;
  var part= post.part;
//var name = post.fname;
  var sql1;
  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/profile");
    return;
  }

console.log('delete');
  //var sql="delete from problems where p_id = '"+userId+"')";
    var sql = "DELETE FROM accidents WHERE p_id = '"+userId+"' and a_name = '"+name+"'and doa='"+date+"'" ;
    var query1 = db.query(sql);

    sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";

  var query = db.query(sql1, function(err, results) {
    console.log(results);
     //message = "Success !! condition added";
     res.render('acc.ejs',{message: message,data: results});
  });




}
else {
  sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
 var query = db.query(sql1, function(err, results) {
   console.log(results);
   message = "";
    //message = "Success !! condition added";
    res.render('acc.ejs',{message:message,data: results});
 });

}



};





exports.remove2 = function(req,res){
  var user =  req.session.user,
	userId = req.session.userId;
  var post = req.body;
  console.log(post);
//  var date= post.date;
//  var name= post.family_id;
  //var part= post.part;
  //var data;
//var name = post.fname;

  var message = '';
  //console.log(name);
  if(req.method == "POST"){

  if(userId == null){
    res.redirect("/profile");
    return;
  }

  var sql2= "UPDATE users SET family_id = '' WHERE p_id ='"+userId+"'";
  var query2 = db.query(sql2, function(err,result1){

  var sql= "SELECT family_id FROM users WHERE p_id ='"+userId+"'";
  var query1 = db.query(sql, function(err,result){

    console.log(result);
    if(result[0].family_id==''){
      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '*##*'";

      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

         res.render('family.ejs',{name:"No Id",data: results,message: message});
      });

    }
    else {
      var sql1= "SELECT first_name,last_name,blood_group,age from users WHERE family_id = '"+result[0].family_id+"'";

      var query = db.query(sql1, function(err, results) {
        console.log(results);
      //  var rows = results;
         //message = "Success !! condition added";

         res.render('family.ejs',{name: result[0].family_id,data: results,message: message});
      });
    }



  });

  });


}
else {
  sql1= "SELECT doa,a_name,injured_part FROM accidents WHERE p_id ='"+userId+"'";
 var query = db.query(sql1, function(err, results) {
   console.log(results);
   message = "";
    //message = "Success !! condition added";
    res.render('family.ejs',{message:message,data: results});
 });

}


};





exports.update1 = function(req, res){
  var user =  req.session.user,
  userId = req.session.userId;
  //console.log('Profile');
  var message='';
  if(userId == null){
    res.redirect("/home/dashboard");
    return;
  }

   var sql="SELECT first_name,last_name,mob_no,p_id,user_name,password,family_id,age,blood_group FROM users WHERE p_id='"+userId+"'";
   var query=db.query(sql,function(err,results){
     console.log(results);

     res.render('update_profile.ejs',{data:results,message:message});

    });
  };
  exports.pro_update=function(req,res)
{
  var user =  req.session.user,
  userId = req.session.userId;
  if(req.method == "POST"){
        console.log("IN");
       var post  = req.body;
       console.log(post);
       var name= post.user_name;
       var pass= post.password;
       var fname= post.first_name;
       var lname= post.last_name;
       var mob= post.mob_no;
       var fam =post.family_id;
       var age1 =post.age;
       var blood_group =post.blood_group;
       console.log("IN");
       db.query("update users set first_name='"+fname+"',last_name='"+lname+"',user_name='"+name+"',password='"+pass+"',mob_no='"+mob+"',family_id='"+fam+"',age='"+age1+"' where p_id='"+userId+"'");
     //  var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`,`family_id`,`age`,`blood_group`) VALUES ('" + fname + "','" + lname + "'," + mob + ",'" + name + "','" + pass + "','" + fam + "'," + age + ",'" + blood_group + "')";
      // var sql = "INSERT INTO users(first_name,last_name,mob_no,user_name, password,family_id,age,blood_group) VALUES ('" + fname + "','" + lname + "'," + mob + ",'" + name + "','" + pass + "','" + fam + "'," + age + ",'" + blood_group + "')";
       var sql2="SELECT first_name,last_name,mob_no,p_id,user_name,family_id,age,blood_group,password FROM users WHERE p_id='"+userId+"'";
       var query = db.query(sql2, function(err, result) {
        var message = "Succesfully! Your account has been updated.";

         res.render('update_profile.ejs',{data:result,message: message});
       });

    } else {
       // console.log("NOPE");
       res.render('update_profile');

    }
};















exports.logout = function(req, res){
   var message = '';
   var sess = req.session;

    var message = 'Logged Out';

      res.render('index.ejs',{message:message});

};
