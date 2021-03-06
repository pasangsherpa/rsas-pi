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
    frontLeftPin = 0,
    frontRightPin = 1,
    backLeftPin = 2,
    backRightPin = 3,
    camera = new RaspiCam({
        mode: "timelapse",
        output: "./photo/img.jpg",
        encoding:"jpg",
        timelapse: 200,
        timeout: 86400000
    });

startStopDaemon(function() {
    Parse.initialize("GabAeJSBADI5LJzFSdTzBX7Ru4Ns2Kq2UMhtXaI8", "xwaDV6YKCz2oKfV6tw1jKeceTSXRbLH0mfgY2nP9");

    wpi.mcp3004Setup(BASE, CHANNEL);
    wpi.setup();
    wpi.pinMode(frontLeftPin, wpi.INPUT);
    wpi.pinMode(frontRightPin, wpi.INPUT);
    wpi.pinMode(backLeftPin, wpi.INPUT);
    wpi.pinMode(backRightPin, wpi.INPUT);
    camera.start();
    http.createServer(function(req, resp) {
        resp.writeHead(200, {
            "Content-Type": "text/plain"
        });
        resp.write("Check the console bro..");
        resp.end();
    }).listen(8000);

    setInterval(function() {
        var left = wpi.analogRead(BASE),
            frontLeftValue = wpi.digitalRead(frontLeftPin),
            frontRightValue = wpi.digitalRead(frontRightPin),
            backLeftValue = wpi.digitalRead(backLeftPin),
            backRightValue = wpi.digitalRead(backRightPin);

        //console.log("frontLeftValue: " + frontLeftValue)
        //console.log("frontRightValue: " + frontRightValue)
        //console.log("backLeftValue: " + backLeftValue)
        //console.log("backRightValue: " + backRightValue)

        //if (frontLeftValue || frontRightValue || backLeftValue || backRightValue) {
            //console.log("Someone is in the room")
             //recordActivity('/home/pi/projects/rsas-pi/pi/photo/img.jpg', value, function() {
             //    console.log("activity saved")
             //});
        //}
        console.log("Left Analog: " + left + "	|	Right Digital: " + frontRightValue);
        if (left > 320 && frontRightValue) {
        
             recordActivity('/home/pi/projects/rsas-pi/pi/photo/img.jpg', left, function() {
                 console.log("activity saved")
             });
         }
        
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
