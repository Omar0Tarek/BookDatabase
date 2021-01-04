var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req, res){ 
	res.render('login.ejs'); 
});

app.get('/dune',function(req,res){
	res.render('dune.ejs');
});

app.get('/fiction',function(req,res){
	res.render('fiction.ejs');
});

app.get('/flies',function(req,res){
	res.render('flies.ejs');
});

app.get('/grapes',function(req,res){
	res.render('grapes.ejs');
});

app.get('/home',function(req,res){
	res.render('home.ejs');
});

app.get('/leaves',function(req,res){
	res.render('leaves.ejs');
});

app.get('/login',function(req,res){
	res.render('login.ejs');
});

app.get('/mockingbird',function(req,res){
	res.render('mockingbird.ejs');
});

app.get('/novel',function(req,res){
	res.render('novel.ejs');
});

app.get('/poetry',function(req,res){
	res.render('poetry.ejs');
});

app.get('/readlist',function(req,res){
	res.render('readlist.ejs');
});

app.get('/registration',function(req,res){
	res.render('registration.ejs');
});

app.get('/searchresults',function(req,res){
	res.render('searchresults.ejs');
});

app.get('/sun',function(req,res){
	res.render('sun.ejs');
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
		res.redirect('/registration');
	} else {
		content.push({username: user, password: pass});
		let write = JSON.stringify(content);
		fs.writeFileSync('users.json', write);
		res.redirect('/login');
	}
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
		res.redirect('/home');
	} else {
		res.redirect('/login');	
	}
});

if(process.env.PORT){
  app.listen(process.env.PORT);
} else {
  app.listen(8080);
}
