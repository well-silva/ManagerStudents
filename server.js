const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express()

//Configurando a pasta public.
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

// Config da template engine
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: true
})

server.listen(5000, () => console.log('Servidor está rodando'))