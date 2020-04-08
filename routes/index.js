var express        = require('express'),
   router          = express.Router({mergeParams:true}),
   passport        = require('passport'),
   User            = require("../models/users")
   Product         = require("../models/product"),
   Cart            = require("../models/cart")
 
router.get('/', function(req,res){
    res.render("home");
});

productArr = [
    {
        image:"https://picsum.photos/id/237/200/300",
        name:"KUTTA",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/seed/picsum/200/300",
        name:"pahad",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/200/300?grayscale",
        name:"werr",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/200/300/?blur",
        name:"ijwe",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/id/870/200/300?grayscale&blur=2",
        name:"xcjs",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/id/237/200/300",
        name:"loki",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/200/300/?blur",
        name:"loki",
        description:"ye ek kaala kutta h!!!",
    },
    {
        image:"https://picsum.photos/id/237/200/300",
        name:"loki",
        description:"ye ek kaala kutta h!!!",
    }

];

// Product.create(productArr, function(err,product){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(product)
//     };
// });


router.get('/flick', isLoggedIn, function(req,res){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }else{
            res.render("flick", {products: products});
        }
    });

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