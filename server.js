const bodyParser = require ('body-parser');
const express = require('express');
const cors = require('cors');
const api = require ('./servermodules/routes/api');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
    extended: true  // to support URL-encoded bodies
}));

//node port number
const PORT = 7081;
app.use(express.static(__dirname+'/dist/pjt11'));
app.use('/api',api);

app.listen(PORT,function(){
    console.log('server running on port '+ PORT);
});
