const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const bodyParser = require ('body-parser');
const app = express();
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
    dba.collection('user').findAll().toArray()
        .then(results =>{
            //res.setHeader('Access-Control-Allow-Origin', '*');
            
            
            res.end(results);
            console.log(results)
        })
        .catch(error => console.error(error))
});
//cadastrar usuario
app.post('/user', (req, res) =>{
    const user =dba.collection('user').findOne(req.email);

    if(user){
        console.log('Deu ruim');
    }else{
        dba.collection('user').insertOne(req.body)
        .then(result =>{
        req.session.email = req.body.email;
           console.log(req.body);
        })
        .catch(error => console.error(error))
    }
    
        
    
    
    
});
//postar imagem
app.post('/images', (req, res)=>{

});
//postar algum texto
app.post('/content', (req, res)=>{
     dba.collection('contents').insertOne(req.body)
        .then(result =>{
            console.log(result);
            console.log("inserido com sucesso");
        })
        .catch(error => console.error(error))
});
//buscar imagem
app.get('/images', (req, res)=>{

});
//buscar algum texto
app.get('/content', (req, res)=>{
    dba.collection('contents').find(res.query.pesquisa)
        .then(results =>{
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
            console.log(results);
        })
        .catch(error => console.error(error))
});