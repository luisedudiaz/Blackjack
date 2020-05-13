const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const { dev, mongo } = require('./config/index')
config.dev = dev

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  await nuxt.ready()

  // Build only in dev mode
  if (dev) {
    const builder = new Builder(nuxt)
    // const swagger = require('./routes/api/v1.0.0/swagger')
    await builder.build()
    // app.use('/api-docs', swagger)
  }

  // Init MongoDB
  await mongo.init()

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
