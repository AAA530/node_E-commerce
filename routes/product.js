var express        = require('express'),
   router          = express.Router({mergeParams:true}),
   Product         = require("../models/product"),
   Cart            = require("../models/cart")


router.get('/add-to-cart/:id', function(req, res, next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product){
         if(err){
             console.log(err);
             console.log('hii');
             return res.redirect('/home');
         }
            cart.add(product, productId);
            req.session.cart = cart;
            console.log(req.session.cart);
            console.log('hello');
            res.redirect("/flick");
         
    })
})
   
router.get("/shopping-cart", function(req,res){
    if(!req.session.cart){
        return res.render("shopping-cart", {products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice});
});


module.exports = router;   