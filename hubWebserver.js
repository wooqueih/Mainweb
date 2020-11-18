var http = require("http");
var fs = require("fs");
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    if (q.pathname == "/") {
        fs.readFile("hub/hub.html", function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {'Content-Type': 'text/html', "Content-Security-Policy": "default-src 'unsafe-inline' http://localhost:8080 https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'unsafe-inline' http://localhost:8080"});
            res.write(data);
            return res.end();
        });
    } else {
        let dat = "." + q.pathname;
        fs.readFile(dat, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        var typeReqArr = q.pathname.split(".");
        var conType
        if(typeReqArr[typeReqArr.length-1] == "js"){
            conType = "application/javascript";
        } else {
            conType = "text/" + typeReqArr[typeReqArr.length-1];
        }
        res.writeHead(200, {'Content-Type': conType, "Content-Security-Policy": "default-src 'unsafe-inline' http://localhost:8080 https://fonts.googleapis.com https://fonts.gstatic.com; script-src 'unsafe-inline' http://localhost:8080"});
        res.write(data);
        return res.end();
    });
    }
}).listen(8080);
