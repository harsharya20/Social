const express=require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
const port=3000;

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//use for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle =require('./config/passport-google-oauth2-strategy');

const { pass } = require('./config/mongoose');
const MongoStore = require('connect-mongodb-session')(session);//becoz we have to store session information to the database
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//setup chat server to b used with socket.io
const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

if(env.name == 'development'){
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path,'scss'),
    dest: path.join(__dirname, env.asset_path,'css'),
    debug:true,
    outputStyle : 'extended',
    prefix: '/css'

}));
}
//reading through post request
app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static(env.asset_path));


//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));
const rfs = require('rotating-file-stream');

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

// extract style and script from sub pages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//for setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before the deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log( err || 'connect-mongodb setup-okay');
        }
    )
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
