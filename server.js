const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;

var app = express();
hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var sLog = `${now}: ${req.method} ${req.url}`;
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile('server.log', sLog +'\n', (err)=>{if(err)console.log('Unable to applet log to file');});
  next();
});

//app.use((req, res, next)=>{
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname +"/public"));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (sText)=>{
  return(sText.toUpperCase());
});

app.get('/',(req, res)=>{
  //res.send('<html><head><title>Express tests</title></head><body><h1>Hello Express!</h1></body>');
  res.render('home.hbs',{
    webPageName: 'Home',
    pageTitle: 'Home Express Page',
    welcomePageMsg: 'Welcome to my test web page!'
  });
});

app.get('/about',(req, res)=>{
  res.render('about.hbs',{
    webPageName: 'Express About',
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    webPageName: 'Projects',
    pageTitle: 'Git Projects Page'
  });
});

app.get('/bad',(req, res)=>{
  res.send({errorMessage: 'Cannot handle this request'});
});

app.listen(port, ()=> {
  console.log(`Server is up in port ${port}.`);
});
