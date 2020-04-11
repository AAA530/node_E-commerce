var express        = require('express'),
   router          = express.Router({mergeParams:true}),
   passport        = require('passport'),
   sellerUser            = require("../models/selleruser")
//    Product         = require("../models/product"),
//    Cart            = require("../models/cart")
 
router.get('/seller', function(req,res){
    res.render("seller/homeS");
});

router.get('/seller/dashboard', isLoggedIn, function(req,res){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }else{
            res.render("/seller/dashboard");
        }
    });
});

/////////////////// REGISTER

router.get('/seller/register', function(req,res){
    res.render("seller/registerS");
});

///not complete
router.post('/seller/register', function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("seller/registerS");
        }
         passport.authenticate("local")(req,res,function(){
            res.redirect("/seller/dashboard");
        });
        
    });
});

/////////////////// LOGIN

router.get('/seller/login', function(req,res){
    res.render("seller/loginS");
});

router.post('/seller/login', passport.authenticate("local", {
    successRedirect: "/seller/dashboard",
    failureRedirect: "/seller/login"
}),function(req,res){
});

/////////////////// LOGOUT

router.get('/seller/logout', function(req,res){
    req.logout();
    res.redirect("/seller");
});

/////////////////// METADATA

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/seller/login');
};
module.exports = router;