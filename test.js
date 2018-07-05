console.log("HELLO TEST")
var letter = 'a';
for(var i = 0; i < 26; i++)
{
	console.log(String.fromCharCode(letter.charCodeAt() + i));
}
var page = require('webpage').create();
page.open('http://example.com', function(status) {
	  console.log("Status: " + status);
	if(status === "success") {
		    page.render('example.png');
		  }
	  phantom.exit();
});


