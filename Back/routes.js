const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://mongo/Vivaldi',
    (err, conn) => {
        if(err) throw err;
        const db = conn.db();
        conn.close();
    });

let http =require('http'),
    path =require('path'),
    express = require('express'),
    app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended :false}));

app.get('/Vivaldi/items', (req,res)=>{
    let q = (req.query && req.query.busca) ? req.query.busca:'';
    UserDAO.find(q).then((items) =>{
        res.json(items);
    });
});
app.listen(3000);
