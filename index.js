const express = require('express');
const methodOverride = require('method-override');
const app = express();
const petsRouter = require('./routes/pets');
const servicosRouter = require('./routes/servicos');
const homeRouter = require('./routes/home');
const requisicoesLog = require('./middlewares/requisicoesLog');
const session = require('express-session')

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views'); // padrão o express já configura a pasta views
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // responsavel pela conversão do inputs para json ou js 
//Iniciando uma sessao
app.use(session({
    secret: 'my first sesseion',
    resave: false,
    saveUninitialized: false
}))
app.use(requisicoesLog)

app.use(homeRouter);
app.use(petsRouter);
app.use(servicosRouter);

app.use((_req, res, _next) => {
    return res.status(404).render('not-found', { error: 'Página não encontrada' });
})


app.listen(3001, () => console.log('Rodando... na porta 3001'))