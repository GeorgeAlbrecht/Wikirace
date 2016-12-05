// JavaScript source code

var exports = module.exports = {};
exports.page = function(newpage) {
    let wikibase = "https://en.wikipedia.org/";
    let wikipage = wikibase.concat(newpage);
    let prefix = "curl -s ";
    let suffix = " > webData.html";
    var command = prefix.concat(wikipage);
    command = command.concat(suffix);

    console.log(command);


    var exec = require('child_process').exec, child;


    child = exec(command,
        function (error, stdout, stderr) {
            //console.log('stdout: ' + stdout);
            //console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        

        });


}


/*
child1 = exec('awk \'/<div id="bodyContent" class="mw-body-content">/{flag=1;next}/<div id="mw-navigation">/{flag=0}flag\'  webData.html',// > newData.html',
      function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
              console.log('exec error: ' + error);
          } else {
              html = stdout;
              console.log(html);
          }
      });
    */




