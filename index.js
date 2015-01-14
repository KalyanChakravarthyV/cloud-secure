var express = require('express');
var app = express();

var cool = require('cool-ascii-faces');
var fs = require('fs');

var NodeRSA = require('node-rsa');

var key = null;

fs.readFile('key.pkcs8', function (err, data) {

  if (err) {
  	console.log(err);

	key = new NodeRSA({b: 1024});

	var keyExported = key.exportKey('pkcs8');
	
	fs.writeFile('key.pkcs8', keyExported, function (err) {
	  if (err) throw err;



	  console.log('key.isPrivate:'+key.isPrivate());
	  console.log('key.isPublic:'+key.isPublic());

	  console.log('keyExported\'s saved!');
	});  	
  }  	
  else{
	key = new NodeRSA(data);
  }


  	console.log(data);
});








app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send(cool());
	var text = 'Hello RSA!';
	
	var encrypted = key.encrypt(text, 'base64');

	console.log('encrypted: ', encrypted);
	var decrypted = key.decrypt(encrypted, 'utf8');
	console.log('decrypted: ', decrypted);

	console.log(key);

	fs.writeFile('message.txt', 'Hello Node', function (err) {
	  if (err) throw err;
	  console.log('It\'s saved!');
	});







});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});




