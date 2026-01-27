const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');  
const fs = require('fs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'static')));
app.use('/img', express.static(path.join(__dirname, 'img')));


function loadData() {
    const data = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8');
    return JSON.parse(data);
}

app.get('/', (req, res) => {
    res.render('index', { data: loadData() });
});

app.get('/product/:slug', (req, res) => {
    const data = loadData();
    const product = data.products.find(p => p.slug === req.params.slug);
    if (!product) return res.status(404).send('Product not found');
    res.render('product', { product, data });
});

app.get('/allproduct', (req, res) => {
    res.render('allproduct', { data: loadData() });
});



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});