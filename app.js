var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var moviesRouter = require('./routes/movies');

var app = express();

/*var mongoose = require('mongoose');*/

const mongoose = require('mongoose');
require('dotenv').config();
const user = process.env.mongoUser;
const pass = process.env.mongoPass;
/*const url = `mongodb+srv://admin:maquina123@cluster0.ouvovc1.mongodb.net/dbcinema?retryWrites=true&w=majority`;*/
/*const url = 'mongodb+srv://admin:maquina123@cluster0.ouvovc1.mongodb.net/test';*/
/*mongoose.set(('strictQuery', false))*/
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*useCreateIndex: true*/
    
})
.then(console.log('db connection successful'))
.catch(err => console.log(`error: ${err}`))


/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:maquina123@cluster0.ouvovc1.mongodb.net/dbcinema?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
console.log('conectado')
});

/*const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:maquina123@cluster0.ouvovc1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  
  // perform actions on the collection object
  client.close();
  console.log('dbcinema connection sucsessful');
});


mongoose.connect('mongodb+srv://admin:maquina123@cluster0.ouvovc1.mongodb.net/dbcinema?retryWrites=true&w=majority', 
{userNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('dbcinema connection sucsessful'))
.catch((err)=> console.error(err));*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
