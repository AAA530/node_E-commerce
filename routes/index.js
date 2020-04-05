var express        = require('express'),
   router          = express.Router({mergeParams:true});
   passport        = require('passport');
   User            = require("../models/users")
 
router.get('/', function(req,res){
    res.render("home");
});

router.get('/flick', isLoggedIn, function(req,res){
    res.render("flick");
});

/////////////////// REGISTER

router.get('/register', function(req,res){
    res.render("register");
});

router.post('/register', function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/flick");
        });
    });
});


/////////////////// LOGIN

router.get('/login', function(req,res){
    res.render("login");
});

router.post('/login', passport.authenticate("local", {
    successRedirect: "/flick",
    failureRedirect: "/login"
}),function(req,res){
});

/////////////////// LOGOUT

router.get('/logout', function(req,res){
    req.logout();
    res.redirect("/");
});

/////////////////// METADATA

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
};


module.exports = router;