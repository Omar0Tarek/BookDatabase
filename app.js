//**Initializing the App
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

//**Fixing path problem for images
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//**Using bodyParser as MiddleWare for parsing post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//**Setting Default Page to home
//app.set('view engine', 'ejs');
app.get('/', (req, res)=>{ 
	res.render('login.ejs'); 
});


//**Setting Rounting
/*
router.get('/handle',(request,response) => {
    //code to perform particular action.
    //To access GET variable use req.query() and req.params() methods.
});
*/

router.get('/dune',function(req,res){
	res.render('dune.ejs');
});

router.get('/fiction',function(req,res){
	res.render('fiction.ejs');
});

router.get('/flies',function(req,res){
	res.render('flies.ejs');
});

router.get('/grapes',function(req,res){
	res.render('grapes.ejs');
});

router.get('/home',function(req,res){
	res.render('home.ejs');
});

router.get('/leaves',function(req,res){
	res.render('leaves.ejs');
});

router.get('/login',function(req,res){
	res.render('login.ejs');
});

router.get('/mockingbird',function(req,res){
	res.render('mockingbird.ejs');
});

router.get('/novel',function(req,res){
	res.render('novel.ejs');
});

router.get('/poetry',function(req,res){
	res.render('poetry.ejs');
});

router.get('/readlist',function(req,res){
	res.render('readlist.ejs');
});

router.get('/registration',function(req,res){
	res.render('registration.ejs');
});

router.get('/searchresults',function(req,res){
	res.render('searchresults.ejs');
});

router.get('/sun',function(req,res){
	res.render('sun.ejs');
});

//**POST requests
/*
router.post('/handle',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
	console.log(request.body);
});
*/

router.post('/register',function(req,res){
	var user = req.body.username;
	var pass = req.body.password;

	var exist = 0;
	const fs = require('fs');
	fs.readFile("users.json", 'utf8', function(err, data) {
		var content = JSON.parse(data);
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
});
router.post('/login',function(req,res){
	var user = req.body.username;
	var pass = req.body.password;

	var exist = 0;
	const fs = require('fs');
	fs.readFile("users.json", 'utf8', function(err, data) {
		var content = JSON.parse(data);
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
});

app.use('/', router);

//**Running the app on localhost
var server = app.listen(8080, function(){ 
    //console.log('listining to port 4000') 
});

