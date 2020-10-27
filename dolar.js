const request = require('request');
const cheerio = require('cheerio');

const URL = 'https://ptax.bcb.gov.br/ptax_internet/consultarUltimaCotacaoDolar.do';

async function acesso(){
      const response = await request(URL);
      let $ = cheerio.load(response);
      let dolar = $('td[align=right]');
      let data = $('tr[align=CENTER]').text();
      console.log(dolar);
      console.log(data);
      module.exports = dolar;
}
acesso();


/*var request = require('request');
var cheerio = require('cheerio');
function welcome(agent) {
//agent.add(`Welcome to my agent!`);
var search_term = "oi";
var st = encodeURI(search_term);
request('https://screenrant.com/search/'+st+'/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var responseText = "Here are the news";
    $("article").each(function(){
        responseText += "- " + $(this).find("h3").text();
    })
    agent.add(responseText)
  }
});
}

const puppeteer = require('puppeteer');

async function scrapeDolar(url){
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('/html/body/div[5]/div/div/section[1]/div[1]/a/div/span[2]');
	const txt = await el.getProperty('src');
	const rawTxt = await txt.jsonValue();
	
  console.log(rawTxt);
	//module.exports = rawTxt;
}

scrapeDolar('https://economia.uol.com.br/cotacoes/cambio/');*/