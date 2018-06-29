var page = require('webpage').create();
var fs = require('fs');
page.open("https://www.basketball-reference.com/players/j/jordami01/gamelog/1985/", function(status) {
	  console.log("Status: " + status);
	if(status === "success") {
		var title = page.evaluate( "table2csv(\"pgl_basic\")");
		fs.write('1.html', page.content, 'w');
	}
	
	  phantom.exit();
});
