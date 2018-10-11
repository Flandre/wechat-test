const express = require('express')
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const app = express();
app.use(express.static('public'))



app.listen('8233', () => {
  console.log('server started')
  console.log('http://localhost:8233')
})

app.get('/1', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({"msg": [1,2,3]})
})
app.get('/2', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({"msg": [4,5,6]})
})
app.get('/3', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({"msg": [7,8,9]})
})
app.get('/4', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({"msg": [10,11,12]})
})
app.get('/5', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({"msg": []})
})
app.get('/6', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({})
})