var express = require('express');
var path = require('path');
var session = require('express-session');
var fs = require('fs');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'username', resave: true, saveUninitialized: true}));


app.get('/',function(req, res){ 
	if(req.session.username)
		res.redirect('/home');
	else
		res.redirect('/login');
});

app.get('/dune',function(req,res){
	if(req.session.username)
		res.render('dune',{message: ''});
	else
		res.redirect('/');
});

app.get('/fiction',function(req,res){
	if(req.session.username)
		res.render('fiction',{message: ''});
	else
		res.redirect('/');
});

app.get('/flies',function(req,res){
	if(req.session.username)
		res.render('flies',{message: ''});
	else
		res.redirect('/');
});

app.get('/grapes',function(req,res){
	if(req.session.username)
		res.render('grapes',{message: ''});
	else
		res.redirect('/');
});

app.get('/home',function(req,res){
	if(req.session.username)
		res.render('home');
	else
		res.redirect('/');
});

app.get('/leaves',function(req,res){
	if(req.session.username)
		res.render('leaves',{message: ''});
	else
		res.redirect('/');
});

app.get('/login',function(req,res){
	if(req.session.username)
		res.redirect('/',);
	else
		res.render('login', {message: ''});
});

app.get('/mockingbird',function(req,res){
	if(req.session.username)
		res.render('mockingbird',{message: ''});
	else
		res.redirect('/');
});

app.get('/novel',function(req,res){
	if(req.session.username)
		res.render('novel');
	else
		res.redirect('/');
});

app.get('/poetry',function(req,res){
	if(req.session.username)
		res.render('poetry');
	else
		res.redirect('/');
});

app.get('/readlist',function(req,res){
	if(req.session.username){
		var user = req.session.username;
		var data = fs.readFileSync("wanttoread.json");
		var content = JSON.parse(data);		
		var books=[];
		for(var i = 0; i < content.length; i++){
		var myobject = content[i];
		if(myobject.username == user)
		books.push(myobject.book);
		}
		res.render('readlist',{arr:books});
	} else {
		res.redirect('/');
	}
});
	
app.get('/registration',function(req,res){
	res.render('registration', {message: ''});
});

app.get('/searchresults',function(req,res){
	if(req.session.username) {
		var results = JSON.parse(decodeURIComponent(req.query.results));
		res.render('searchresults',{arr: results});
	} else {
		res.redirect('/');
	}
});

app.get('/sun',function(req,res){
	if(req.session.username)
		res.render('sun', {message: ''});
	else
		res.redirect('/');
});

app.post('/search', function(req, res) {
	if(req.session.username){
		var bookToSearch = req.body.Search.toLowerCase();
		var books = [{name : 'Lord of the Flies', address : '/flies'}, {name : 'The Grapes of Wrath', address : '/grapes'},
		{name : 'Leaves of Grass', address : '/leaves'}, {name : 'The Sun and Her Flowers', address : '/sun'}, {name : 'Dune', address : '/dune'},
		{name : 'To Kill a Mockingbird', address : '/mockingbird'}];
		var results = [];
		for(var i = 0; i < books.length; i++) {
			if(books[i].name.toLowerCase().includes(bookToSearch.toLowerCase())) {
				results.push(books[i]);
			}
		}
		res.redirect('/searchresults?results=' + encodeURIComponent(JSON.stringify(results)));
	} else {
		res.redirect('/');
	}
});

app.post('/register',function(req,res){
	var user = req.body.username;
	var pass = req.body.password;

	var data = fs.readFileSync("users.json");
	var content = JSON.parse(data);
	
	var exist = 0;
	for(var i = 0; i < content.length; i++){
		var myobject = content[i];
		if(myobject.username === user)
			exist = 1;
	}
	
	if(exist == 1) {
		res.render('registration', {message: 'User already registered'});
	} else {
		content.push({username: user, password: pass});
		var write = JSON.stringify(content);
		fs.writeFileSync('users.json', write);
		res.redirect('/');
	}
});

app.post('/read',function(req,res){
	if(req.session.username){
		var user = req.session.username;
		var data = fs.readFileSync("wanttoread.json");
		var content = JSON.parse(data);
		var exist = 0;
		for(var i = 0; i < content.length; i++){
			var myobject = content[i];
			if(myobject.username == user && myobject.book == req.body.book)
				exist = 1;
		}
		if(exist == 0) {
			content.push({username: user, book: req.body.book});
			var write = JSON.stringify(content);
			fs.writeFileSync('wanttoread.json', write);
			res.render(req.body.address, {message: 'Book Added Successfully'});
		} 
		else{
			res.render(req.body.address, {message: 'This book is already in your readlist'});
		}
	} else {
		res.redirect('/');
	}
});

app.get('/read',function(req,res){
	res.redirect('/');
});

app.post('/login',function(req,res){
	var user = req.body.username;
	var pass = req.body.password;

	var data = fs.readFileSync("users.json");
	var content = JSON.parse(data);
	
	var exist = 0;
	for(var i = 0; i < content.length; i++){
		var myobject = content[i];
		if(myobject.username == user && myobject.password == pass)
			exist = 1;
	}
	if(exist == 1) {
		req.session.username = user;
		res.redirect('/home');
	} else {
		res.render('login', {message: 'Wrong username or password'});
	}
});

app.get('/logout',function(req,res){
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

if(process.env.PORT){
  app.listen(process.env.PORT);
} else {
  app.listen(8080);
}
