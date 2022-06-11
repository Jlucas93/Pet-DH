const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController')
const validacaoRegistroUsuario = require('../middlewares/validacaoRegistroUsuario')

router.get('/', homeController.index)
router.get('/sobre', homeController.sobre)
router.get('/servicos', homeController.servicos)
router.get('/login', homeController.login)
router.get('/registrar', homeController.create)
router.post('/registrar', validacaoRegistroUsuario, homeController.store)
router.get('/adm', homeController.showAdm)
router.post('/login', homeController.postLogin)
module.exports = router

