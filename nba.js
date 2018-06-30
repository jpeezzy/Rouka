//console.log("HELLO");
/*var page = require('webpage').create();
var fs = require('fs');

var url = "https://www.basketball-reference.com/players/j/jordami01/gamelog/1986/";
page.open(url, function(status) {
	console.log("Status: " + status);
	if(status === "success") {
		var title = page.evaluate( "table2csv(\"pgl_basic\")");
		fs.write('1985.html', page.content, 'w');
	}
	phantom.exit();
});*/


	var page = require('webpage').create();
	var fs = require('fs');
var loadpage = function (i, max){
	if (i === max) {
		phantom.exit();
		return;
	}
	var address = "https://www.basketball-reference.com/players/j/jordami01/gamelog/" + i.toString();
	//var address = "https://www.basketball-reference.com/players/j/jordami01/gamelog/" + i.toString() + '/';
	t = Date.now();
	page.open(address, function(status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} else {
			t = Date.now() - t;
			console.log('Loading ' + address);
			console.log('Loading time ' + t + ' msec');
			var title = page.evaluate( "table2csv(\"pgl_basic\")");
			var fn = i.toString() + '.html';
			fs.write(fn, page.content, 'w');
		}

		loadpage(i+1, max)
	});
};

loadpage(1985, 2004);
/*
for(var i = 1985; i <= 2003; i++)
{
	var page = require('webpage').create();
	var fs = require('fs');
	var url = "https://www.basketball-reference.com/players/j/jordami01/gamelog/" + i.toString() + "/";
//console.log(url);
	page.open(url, function(status) {
		console.log("Status: " + status);
		if(status === "success") {
			var title = page.evaluate( "table2csv(\"pgl_basic\")");
			var fn = i.toString() + '.html';
			fs.write(fn, page.content, 'w');
		}
	phantom.exit();
	});
}*/
