var express = require("express")
var cors = require("cors")
//parsing datadabe json structure (raw types)
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5500

const path = require('path');
const fs = require('fs');

//extrae el json del http dl request 
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({extended:false})
)

var Routes = require("./routes/Routes.js")
app.use("/router",Routes)


const root = path.join(__dirname, 'dist', 'Sistema-Automatizacion');


app.get('*' ,function(req, res) {
  fs.stat(root + req.path, function(err){
    if(err){
        res.sendFile("index.html", { root });
    }else{
        res.sendFile(req.path, { root });
    }
  })
});

app.listen(port);
console.log('Listening on port '+ port);


