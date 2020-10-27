const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

MongoClient.connect(/*LINK DO BANCO*/, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db(/*NOME DO BANCO*/)
    const usersCollection = db.collection('users')
    const contentsCollection = db.collection('contents')
});

app.listen(3021, function(){
    console.log('Ouvindo em 3021')
});
//função teste
app.get('/', (req, res)=>{
    res.send('fala brow2')
});
//buscar ususarios 
app.get('/users', (req, res) =>{
    db.collection('users').find().toArray()
        .then(results =>{
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
            console.log(results)
        })
        .catch(error => console.error(error))
});
//cadastrar usuario
app.post('/users', (req, res) =>{
    usersCollection.insertOne(req.body)
        .then(result =>{
            console.log(result);
        })
        .catch(error => console.error(error))
});
//postar imagem
app.post('/images', (req, res)=>{

});
//postar algum texto
app.post('/content', (req, res)=>{
    contentsCollection.insertOne(req.body)
        .then(result =>{
            console.log(result);
        })
        .catch(error => console.error(error))
});
//buscar imagem
app.get('/images', (req, res)=>{

});
//buscar algum texto
app.get('/content', (req, res)=>{
    db.collection('content').find().toArray()
        .then(results =>{
            res.setHeader('Content-Type', 'application/json');
            res.json(results);
            console.log(results);
        })
        .catch(error => console.error(error))
});