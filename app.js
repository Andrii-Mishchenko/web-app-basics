const express = require('express');
const exphbs = require('express-handlebars');
const products = require('./products.json');

const app = express();
app.use(express.static('public')); //вызывает в папке public статические файлы.

app.set('view engine', 'hbs'); //указываем, что хотим использовать handlebars как шаблонизатор

// настраиваем движок:
app.engine('hbs', exphbs({
  extname: 'hbs', //указываем расширение наших файлов
}));


// Добавляем маршруты
// req - запрос (это объект)
// res - ответ (это объект)
app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Главная страница'});
});

app.get('/about', (req, res) => {
  res.render('about', {cssFileName: 'about', pageTitle: 'О нас'});
});

app.get('/products', (req, res) => {
  res.render('products', {products, cssFileName: 'products', pageTitle: 'Наши продукты'});
});

// Делаем, чтоб карточка продукта открывалась в отдельной вкладке
app.get('/product/:productId', (req, res) => {
  console.log(req.params);

  const product = products.find(p => p.id === req.params.productId);
  res.render('product', { product });
});

app.listen(4444, () => {
  console.log(`Aplication server is running on port ${4444}`);
})




