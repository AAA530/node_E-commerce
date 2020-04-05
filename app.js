var express                = require('express'),
    mongoose               = require('mongoose'),
    bodyParser             = require('body-parser'),
    passport               = require('passport'),
    LocalStrategy          = require('passport-local'),
    passportLocalMongoose  = require('passport-local-mongoose'),
    session                = require('express-session'),
    User                   = require('./models/users');

var indexRoute             = require('./routes/index');    

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
    failureFlash: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

/////////////////// ROUTES

app.use(indexRoute); 

/////////////////// PORT

app.listen(4000, function(){
    console.log("Server has started at PORT 4000");
});