var express = require('express');
var app = express();
var helpers = require('express-helpers')(app);
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/candies-app');

var routes = require('./config/routes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set up our app to accept to use EJS
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));


app.use(routes);

app.listen(3000, function(){
  console.log('Connected to server at port 3000');
});
