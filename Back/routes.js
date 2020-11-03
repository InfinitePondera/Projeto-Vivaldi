const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const app = express();
const multer  = require('multer');
const multerConfig = require('./config/multer')
const upload = multer({dest: './uploads/'})
var session = require('express-session');

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret:'s3crets'
}));

MongoClient.connect('mongodb://127.0.0.1:27017/Vivaldi', { useUnifiedTopology: true })
  .then(client => {
    dba = client.db('Vivaldi');
    
    console.log('Connected to Database');
});

app.listen(3021, function(){
    console.log('Ouvindo em 3021')
});
//função teste
app.get('/', (req, res)=>{
    res.send('fala brow2')
});
//buscar ususarios 
app.get('/user', (req, res) =>{
    var users = false;
    dba.collection('user')
    .find({email: req.query.email, senha: req.query.senha})
    .toArray((err, docs)=>{
        if(docs.length>0){
            users= true;
        }
        else{
            users=false;
        }
        if(users===true){
            res.status(200).send({message:'Logado'});
            console.log('Sucesso');
            req.session.email = req.query.email;
            console.log(req.query);
        }else{
            res.status(404).send({message:'Não logado'});
            console.log('Cadastro não encontrado');
        }
    })
});
//cadastrar usuario
app.post('/user', (req, res) =>{
    var user = false;
    dba.collection('user')
    .find({email: req.body.email})
    .toArray((err, docs)=>{
        if(docs.length>0){
            user= true;
         }else{
            user = false;
         }
         if(user=== true){
            res.status(404).send({message: 'Usuario já existe'})
            console.log('Deu ruim, email ja existe');
        }
       else{
            dba.collection('user').insertOne(req.body)
            .then(result =>{
                req.session.email = req.body.email;
                res.send('registrado tudo ok');
                console.log(user);
                console.log(req.body.email);
            })
            .catch(error => console.error(error))
        }
    });
});
//postar texto e imagem
app.post('/contents', multer(multerConfig).single("file"),(req, res)=>{
    upload(req, res, function(err){
        if(err instanceof multer.MulterError){
            res.status(500).send('erro do multer, olhe o console')
            console.log(err)
        }else if(err){
            res.status(500).send('erro no upload, olhe o console')
            console.log(err)
        }
    })
    var contentWLoc = {
        subject: req.body.subject,
        post: req.body.post,
        img: req.file.filename
    }
    dba.collection('contents').insertOne(contentWLoc)
    .then(result => {
        res.status(200).send('uploaded tudo ok')
    })
    .catch(error => console.error(error));
    var locImg = {
        path: req.file.path,
        filename: req.file.filename
    }
    dba.collection('images').insertOne(locImg)
    .then(result => {
        res.status(200).send('uploaded tudo ok')
    })
    .catch(error => console.error(error));
});

//COISAS QUE PODER SER DELETADAS, FUNÇÕES QUE FORAM TROCADAS [
    //postar algum texto
    //app.post('/test', (req, res)=>{
    //     dba.collection('contents').insertOne(req.body)
    //        .then(result =>{
    //            res.send('postado tudo ok')
    //            console.log(result);
    //            console.log("inserido com sucesso");
    //        })
    //        .catch(error => console.error(error))
    //});
    //
    //buscar imagem
    //app.get('/images', (req, res)=>{});
// ];

//buscar postagens
app.get('/contents', (req, res)=>{
    
    dba.collection('contents').find(res.query.pesquisa)
        .then(results =>{
            res.end(results);
            console.log(results);
        })
        .catch(error => console.error(error));
});