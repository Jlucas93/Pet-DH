const Servico = require('../models/servico');
const Usuario = require('../models/usuarios')

const homeController = {
    index: (req, res) => {
        const title = 'Minha primeira aplicação com ejs';
        res.render('home', { title });
    },
    sobre: (req, res) => {
        res.render('home/sobre');
    },
    servicos: (req, res) => {
        const servicos = Servico.findAll();
        res.render('home/servicos', { servicos });
    },
    login: (req, res) => {
        res.send('Login');
    },
    create: (req, res) => {
        res.render('home/registro')
    },
    store: (req, res) => {
        const { nome, email, senha } = req.body
        const usuario = {
            nome,
            email,
            senha
        };

        Usuario.save(usuario);

        return res.redirect('/'); // endpoint ou routes
    }
}

module.exports = homeController;
