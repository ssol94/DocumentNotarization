const express = require('express');
const path = require('path');
const app = express();
var router = express.Router();
const axios = require('axios')

// html => pdf
const fs = require('fs')
const pdf = require('html-pdf')
const html = fs.readFileSync('./html/verify.html', 'utf8')
const html2 = fs.readFileSync('./html/verify2.html', 'utf8')
const html3 = fs.readFileSync('./verify.html', 'utf8')
const options = { format: 'Letter' }

//hash
const crypto = require('crypto')
const md5File = require('md5-file/promise')


app.use(express.static(path.join(__dirname, 'html')));
app.get('/', (req, res) => {
  console.log('main')
  res.sendFile(path.join(__dirname, 'html', './main.html'));
});
app.get('/convert', (req, res) => {
  // html => pdf 변환
  pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
  });
  // hash
  let num = html.search('uniqueNo') + 10

  const uniqueNo = html.substring(num, num + 4) // 지정된 키 길이만큼 더해줌.
  console.log(uniqueNo)

  // const value = crypto.createHash('sha512').update(uniqueNo).digest('hex')
  let hash = crypto.createHash('sha512').update(html).digest('hex')
  console.log('key : ', hash)

  axios({
    method: 'post',
    url: 'http://52.141.33.135:3001/btap/logistics/documentInfo',
    data: {
      uniqueKey: uniqueNo
      ,data: hash
    }
  }).then(function (response) {
    console.log('success')
  }).catch(function (error) {
    console.log('fail')
  })
})

app.get('/confirm', (req, res) => {
  // hash
  let num = html.search('uniqueNo') + 10

  const uniqueNo = html.substring(num, num+4)
  let hash = crypto.createHash('sha512').update(html2).digest('hex')
  console.log('key : ', hash)

  axios.get('http://52.141.33.135:3001/btap/logistics/documentInfo/' + uniqueNo)
  .then(function (response) {
    if (response.data == hash) {
      console.log('같음')
    } else {
      console.log('다름')
    }
  })
});

app.listen(8080, () => {
  console.log('Express App on port 8080!');
});
