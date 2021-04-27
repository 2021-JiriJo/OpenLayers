var fs = require('fs');
var jade = require('jade');


fs.readdir('./src/static',function(err,filelist){ 
    console.log(filelist); 
    directories = filelist;

    let html_data = jade.renderFile('./src/index.jade',{'dirs':directories});

    console.log(html_data);

    fs.writeFile('./src/index.html',html_data,function(err){ 
        if (err === null) { 
            console.log('success'); 
        } 
        else { 
            console.log('fail'); 
        } 
    });
});





