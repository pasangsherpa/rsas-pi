/**
 *  @author - Pasang Sherpa
 *  @author - Aaron Nelson
 *  @author - Jonathan Forbes
 *  @author - Takatoshi Tomoyose
 */

var http = require('http'),
    wpi = require('wiring-pi'),
    BASE = 123,
    CHANNEL = 0,
    value;

// wpi.mcp3004Setup(BASE, CHANNEL);
wpi.setup('sys');

http.createServer(function(req,resp) {
    resp.writeHead(200, {"Content-Type": "text/plain"});
    resp.write("Hello World");
    resp.end();
    
    console.log("sample output to console");

}).listen(8080);