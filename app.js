var express                = require('express'),
    mongoose               = require('mongoose'),
    bodyParser             = require('body-parser'),
    passport               = require('passport'),
    LocalStrategy          = require('passport-local'),
    passportLocalMongoose  = require('passport-local-mongoose'),
    session                = require('express-session'),
    mongoStore             = require("connect-mongo")(session),
    User                   = require('./models/users'),
    indexRoute             = require('./routes/index'),
    productRoute           = require('./routes/product'),
    sellerRoute            = require('./routes/seller')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/e_commerce");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret:"Sergio Marquina", 
    resave:false,
    saveUninitialized:false,
    failureFlash: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 *1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.session = req.session;
    next();
})

/////////////////// ROUTES

app.use('/', indexRoute);
app.use('/', productRoute);
app.use('/', sellerRoute); 

/////////////////// PORT

app.listen(4000, function(){
    console.log("Server has started at PORT 4000");
});