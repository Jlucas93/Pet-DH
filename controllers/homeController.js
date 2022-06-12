const Servico = require('../models/servico');
const Usuario = require('../models/usuarios')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');

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
        res.render('home/login');
    },
    create: (req, res) => {
        res.render('home/registro')
    },
    showAdm: (req, res) => {
        res.render('adm/')
    },
    store: (req, res) => {
        let error = validationResult(req)
        if (error.isEmpty()) {

            const { nome, email, senha } = req.body
            const senhaCriptografada = bcrypt.hashSync(senha, 10)
            const usuario = {
                nome,
                email,
                senha: senhaCriptografada
            };
            Usuario.save(usuario);

            return res.redirect('/adm'); // endpoint ou routes
        }
        res.render('home/registro', { listaDeErros: error.errors, old: req.body })
    },
    postLogin: (req, res) => {
        const {
            email,
            senha
        } = req.body
        const user = Usuario.findByEmail(email)
        if (!user) {
            res.render('home/login', { error: 'Email ou senha estão incorretos ou não existe' })
            console.log('erro no email')
            return
        } else if (!bcrypt.compareSync(senha, user.senha)) {
            res.render('home/login', { error: 'Email ou senha estão incorretos ou não existe' })
            console.log('erro na senha')
            return
        }
        return res.redirect('/adm')
    }
}

module.exports = homeController;
