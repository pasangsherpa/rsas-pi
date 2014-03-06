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
    wait,
    camera = new RaspiCam({
        mode: "photo",
        output: "./photo/img.jpg",
        encoding: "jpg",
        timeout: 0
    });

startStopDaemon(function() {
    Parse.initialize("GabAeJSBADI5LJzFSdTzBX7Ru4Ns2Kq2UMhtXaI8", "xwaDV6YKCz2oKfV6tw1jKeceTSXRbLH0mfgY2nP9");

    wpi.mcp3004Setup(BASE, CHANNEL);
    wpi.setup('sys');
    camera.start();
    http.createServer(function(req, resp) {
        resp.writeHead(200, {
            "Content-Type": "text/plain"
        });
        resp.write("Check the console bro..");
        resp.end();
    }).listen(8000);

    setInterval(function() {
        var value = wpi.analogRead(BASE);
        if (value > 500) {        
           	//camera.on("read", function(err, timestamp, path) {
                //console.log("image captured with path: " + path + " @ : " + timestamp);
                recordActivity('/home/pi/projects/rsas-pi/pi/photo/img.jpg', value, function(){
                    console.log("activity saved")
                });
            //});
        }
        console.log("value: " + value);
    }, 500);
	
    function recordActivity(path, value, callback) {
        var Activity = Parse.Object.extend("Activity"),
            activity = new Activity(),
            image, fileData, now = new Date();
        filedata = Array.prototype.slice.call(new Buffer(fs.readFileSync('/home/pi/projects/rsas-pi/pi/photo/img.jpg')), 0)
        image = new Parse.File("image.jpg", filedata);
        image.save().then(function(file) {
	    console.log("saving activity to parse")
            activity.set("enteredAt", now);
            activity.set("value", value);
            activity.set("photo", file);
            activity.set("photoUrl", file.url());
            activity.save();
            callback(activity);
        });
    }

}).on("stop", function() {
    this.stdout.write('Stopping at ' + new Date() + '\n');
});
