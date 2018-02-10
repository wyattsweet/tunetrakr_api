import 'babel-polyfill'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

import UsersApi from './UsersApi'

const app = express()
const usersApi = new UsersApi()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

// passes any errors that happen in await function to
// expresses default error handling
const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

app.post(
  '/api/v1/user',
  asyncMiddleware(async (req, res) => {
    const reqData = req.body
    const hash = await bcrypt.hash(reqData.password, 10)
    const userData = await usersApi.createUser(reqData.email, String(hash))
    const {email, id} = JSON.parse(userData)[0]
    const cert = fs.readFileSync('jwtRS256.key', 'utf8')
    const token = jwt.sign({sub: id, email}, cert, {
      algorithm: 'RS256'
    })
    res.send(token)
  })
)

app.listen(3000)
