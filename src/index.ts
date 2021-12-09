import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import dispatcher from './utils/dispatcher'
import { resolve } from 'path'
import auth from './utils/auth'
import { sign } from 'jsonwebtoken'

dotenv.config()
const port = process.env.npm_config_port || process.env.PORT
const secret = String(process.env.JWT_SECRET)

const app = express()
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/authorize', (req, res) => {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    const exp = Math.floor(date.getTime() / 1000)
    const payload = {
        exp,
    }
    const token = sign(payload, secret)
    res.send({token}).end()
})

app.use(auth({
    secret,
}))

app.use(dispatcher())

app.get('/', (req, res) => {
    res.send('Hello world!').end()
})

app.listen(port, () => {
    console.log('\x1B[32mServer Start Successfully!\x1B[0m')
})

const statics = express()
statics.use(express.static(resolve(__dirname, '../public')))
statics.listen(3002)
