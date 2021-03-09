import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { body, query, validationResult } from 'express-validator'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 3000
const SECRET = "SIMPLE_SECRET"
const user = require('../models/user')

interface JWTPayload {
  username: string;
  password: string;
}

app.post('/login',
  (req, res) => {

    const { username, password } = req.body
    //Use username and password to create token.
    if(!username || req.body.password !== user.password){
      return res.status(400).json({
        message: 'Invalid username or password',
      })
    }else{
      return res.status(200).json({
        message: 'Login succesfully',
        token: 'token ที่ระบบสร้างขึ้น'
      })}
      const token = jwt.sign({username :user.username},SECRET)
      res.json({token})
  })

app.post('/register',
  (req, res) => {

    const { username, password, firstname, lastname, balance } = req.body
  })

app.get('/balance',
  (req, res) => {
    const token = req.query.token as string
    try {
      const { username } = jwt.verify(token, SECRET) as JWTPayload
      
    }
    catch (e) {
      //response in case of invalid token
      res.status(401).json({
        message: 'Invalid token'
      })
    }
  })

app.post('/deposit',
  body('amount').isInt({ min: 1 }),
  (req, res) => {
    
    //Is amount <= 0 ?
    if (!validationResult(req).isEmpty())
    if(user.amount <= 0)
      return res.status(400).json({ message: "Invalid data" })
    else if(user.amount >0) return res.status(401).json({ message: "Deposit token"})
    else return res.status(200).json({ message: "Deposit successfully", balance:"200" })
  })

app.post('/withdraw',
  (req, res) => {

    if (!validationResult(req).isEmpty())
    return res.status(400).json({ message: "Invalid data" })
})
  

app.delete('/reset', (req, res) => {

  //code your database reset here
  
  return res.status(200).json({
    message: 'Reset database successfully'
  })
})

app.get('/me', (req, res) => {
  
})

app.get('/demo', (req, res) => {
  return res.status(200).json({
    message: 'This message is returned from demo route.'
  })
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))