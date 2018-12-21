var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://kbbi.kemdikbud.go.id/entri/pasar';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var arti;
      var json = { arti : "" };

      $('.container.body-content').filter(function(){
        var data = $(this);
        arti = data.children().first().next().next().next().next().next();
        arti = arti.children().first().text().trim();

        json.arti = arti;
      })

    }

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;