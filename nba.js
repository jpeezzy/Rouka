var page = require('webpage').create();
var fs = require('fs');

var iteratePage = function(letter){
	if(letter == '{')
	{
		phantom.exit();
		return;
	}
	//Iterating through the alphabet
	//console.log(String.fromCharCode(letter.charCodeAt() + i));
	var address = "https://www.basketball-reference.com/players/" + String.fromCharCode(letter.charCodeAt());
	console.log(address);
	t = Date.now();
	page.open(address, function(status) {
		if (status !== 'success') {
			console.log('FAIL to load the address');
		} 
		else {
			t = Date.now() - t;
			console.log('Loading ' + address);
			console.log('Loading time ' + t + ' msec');
			//FIND NAMES OF PLAYERS
			//var title = page.evaluate( "table2csv(\"pgl_basic\")");
			var fn =  "Alphabetical_Order/"+letter + '.html';
			fs.write(fn, page.content, 'w');
		}
		iteratePage( String.fromCharCode(letter.charCodeAt()+1));
	});
	//end iteration
}
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
		} 
		else {
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

//loadpage(1985, 2004);
iteratePage('a');
