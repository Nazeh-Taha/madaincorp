var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var staticFiles = require ('serve-static');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// log all api traffic to console
app.use('api/*',req=>{
    console.log(req);
    next();
});



app.post('/api/login', function async (req, res) {//add Async/await

    if(req.body && req.body.email && req.body.password){
        //add another "=" to check the type
        if(req.body.email === '123@123.123'){//email address should look like the regular email

            if(req.body.password === '123123') { //password should contain at least 8 characters and one special character at least and one number at least
                var user ={
                    name:"Alex Jones"
                    , email:req.body.email
                    // , password:req.body.password -- For safety, the password should not be sent
                    //   you should create token and send it
                    , profilePic:"http://lorempixel.com/500/500/people/"
                };
                res.send(200, user);
            }
            else
                res.send(400,{message:'wrong password or email'});//send one message for wrong password or email "wrong password or email"

        }else
            res.send(400,{message:'wrong password or email'});//send one message for wrong password or email "wrong password or email"

    }
    else
        res.send(422,{message:'Please fill all required fields'});//Choose a brief and tact message and send it to the user in case of error
        //it should not reach to the user because he already got an error message from the front end
});


var serve = staticFiles('public/', {'index': ['index.html']});
app.use(serve);


app.listen(3000);
console.log("running on http://localhost:3000");