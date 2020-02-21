var express = require("express");
var app = express ();

app.use(express.static('public')); // This line.

app.set("view engine","ejs");


app.get('/',function(req , res){
    res.render("index.ejs");
})

var port = process.env.PORT || 4000;

app.listen(port, function(port) { 
    console.log('Server listening on port'+port); 
  });
