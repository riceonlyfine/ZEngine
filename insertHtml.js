
var fs = require("fs");
var path = require('path');
var join = require('path').join;





let jsFiles = [];

function getJsFiles(jsonPath){
    function findJsFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsFile(fPath);
            }
            if (stat.isFile() === true) { 
                if (fPath.split('.').pop() == 'js'){
                    fPath = fPath.replace("bin\\", "");
                    jsFiles.push(fPath);
                }
            }
        });
    }
    findJsFile(jsonPath);
    console.log(jsFiles);
}

getJsFiles("./bin");

var index = './bin/index.html';
fs.readFile(index, function (err, buffer) {
    var result = buffer.toString();


    let appendJS = '';

    for (let i = 0; i < jsFiles.length; ++i){
        appendJS += "   <script type=\"text\/javascript\" src=\"" + jsFiles[i] + "\"><\/script>\r\n";
    }
    

    console.log(appendJS);
    result = result.replace("<body>", "<body>\r\n\r\n" + appendJS)

    fs.writeFile(index, result,function(err,fd){
    	console.log('-------> insert js  success!');
    });
});




