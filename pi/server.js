/**
 *  @author - Pasang Sherpa
 *  @author - Aaron Nelson
 *  @author - Jonathan Forbes
 *  @author - Takatoshi Tomoyose
 */

var http = require('http'),
	fs = require('fs'),
	util = require('util'),
	mime = require('mime'),
    wpi = require('wiring-pi'),
    Parse = require('parse').Parse,
	RaspiCam = require('raspicam'),
    startStopDaemon = require('start-stop-daemon'),
    BASE = 123,
    CHANNEL = 0,
    value, wait,
	camera = new RaspiCam({
		mode:"photo",
		output:"./photo/img.jpg",
		encoding:"jpg",
		timeout:0
	});

startStopDaemon (function(){
	Parse.initialize("GabAeJSBADI5LJzFSdTzBX7Ru4Ns2Kq2UMhtXaI8", "xwaDV6YKCz2oKfV6tw1jKeceTSXRbLH0mfgY2nP9");

	wpi.mcp3004Setup(BASE, CHANNEL);
	wpi.setup('sys');

	http.createServer(function(req, resp) {
    	resp.writeHead(200, {
        	"Content-Type": "text/plain"
	    });
		resp.write("Check the console bro..");
	    resp.end();
	}).listen(8000);

	setInterval(function() {
    	value = wpi.analogRead(BASE);
		if (!wait && value > 100) {
			camera.start();
			camera.on("read", function(err, timestamp, filename){
				console.log("image captured with filename: " + filename + " @ : " + timestamp);
				recordActivity('/home/pi/projects/rsas-pi/pi/photo/img.jpg', function(){});
			});
    	}
    	console.log("value: " + value);
	}, 500);
	
	function base64Encode(path) {
		return util.format("data:%s;base64,%s", mime.lookup(path), fs.readFileSync(path).toString("base64"));
	}
	
	function recordActivity(filename, callback) {
    	var Activity = Parse.Object.extend("Activity"),
        	activity = new Activity(), now = new Date(), image, base64data;
//		fs.readFile(filename, function(err, data) {
	       	base64data = base64Encode(filename),
	       	image = new Parse.File("image.jpg", base64data);
			image.save().then(function(file) {
				wait = true;
			    activity.set("enteredAt", now.toLocaleString());
			    activity.set("file", null);
			    activity.set("value", value);    
    			activity.set("photo", file);
    			activity.save(null, {
    				success: function() {
		    			setTimeout(function(){
    						wait = false;
    					}, 5000)
    				}
    			});
    		callback();
			});		
  //  	});		
	}

}).on("stop", function(){
	this.stdout.write('Stopping at ' + new Date() + '\n');
});
