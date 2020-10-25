const { render } = require('@testing-library/react');

let http = require('http'),
path = require('path'),
express = require('express'),
app= express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/app', (req, res) =>{
    res.render('index');
});


app.listen(3000);