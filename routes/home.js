const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const validacaoRegistroUsuario = require('../middlewares/validacaoRegistroUsuario')
const verificarLogin = require('../middlewares/verificarLogin')

router.get('/', homeController.index)
router.get('/sobre', homeController.sobre)
router.get('/servicos', homeController.servicos)
router.get('/login', homeController.login)
router.post('/login', homeController.postLogin)
router.get('/registrar', homeController.create)
router.post('/registrar', validacaoRegistroUsuario, homeController.store)
router.get('/adm', verificarLogin, homeController.showAdm)
router.get('/logout', homeController.logout)

module.exports = router

