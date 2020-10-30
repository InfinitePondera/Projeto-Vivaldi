var session = require('express-session');
var express = require('express');
var router = express.Router();
var app = express();

app.use(session({
    secret:'s3crets'
}));


router.post('/', function(req, res, next){
    let login= req.body.name;

    if(login===/**/&&password===/* */){
        req.session.email =  req.body.email;
        return ;
    } 
});


router.get('/', function(req,res,next){
    if(req.session && req.session.login){
        res.render({sess: req.session.namelog});
    }
    return;
})


