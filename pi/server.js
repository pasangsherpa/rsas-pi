/**
 *  @author - Pasang Sherpa
 *  @author - Aaron Nelson
 *  @author - Jonathan Forbes
 *  @author - Takatoshi Tomoyose
 */

var http = require('http'),
    wpi = require('wiring-pi'),
    Parse = require('parse').Parse,
    startStopDaemon = require('start-stop-daemon'),
    BASE = 123,
    CHANNEL = 0,
    value;

startStopDaemon (function(){
Parse.initialize("GabAeJSBADI5LJzFSdTzBX7Ru4Ns2Kq2UMhtXaI8", "xwaDV6YKCz2oKfV6tw1jKeceTSXRbLH0mfgY2nP9");

wpi.mcp3004Setup(BASE, CHANNEL);
wpi.setup('sys');

http.createServer(function(req, resp) {
    resp.writeHead(200, {
        "Content-Type": "text/plain"
    });
	recordActivity(null, function(){
		console.log("activity saved..");
	});
    resp.write("Check the console bro..");
    resp.end();
}).listen(8000);

setInterval(function() {
    value = wpi.analogRead(BASE);
    // console.log("value: " + value);
}, 500);

function recordActivity(file, callback) {
    var Activity = Parse.Object.extend("Activity"),
        activity = new Activity();
    activity.set("enteredAt", new Date());
    activity.set("file", null);
    activity.set("value", value);    
    activity.save();
    callback();
}

}).on("stop", function(){
	this.stdout.write('Stopping at ' + new Date() + '\n');
});
