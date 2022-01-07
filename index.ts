import express from 'express'
import { resolve } from 'path'
import { config } from 'dotenv'
import { WebApiServer } from './src'
// import auth from './src/utils/auth'

config()
const port = Number(process.env.npm_config_port || process.env.PORT)
const secret = String(process.env.JWT_SECRET)

// app.get('/authorize', (req, res) => {
//     const date = new Date()
//     date.setHours(date.getHours() + 1)
//     const exp = Math.floor(date.getTime() / 1000)
//     const payload = {
//         exp,
//     }
//     const token = sign(payload, secret)
//     res.send({token}).end()
// })

const server = new WebApiServer(port)
server.rootDirectory = resolve(__dirname, './controllers')
// server.use(auth({
//     secret,
// }))
server.run()

// const statics = express()
// statics.use(express.static(resolve(__dirname, '../public')))
// statics.listen(3002)
