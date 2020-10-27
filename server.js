
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const mysql = require('mysql');
const puppeteer = require('puppeteer');





// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];


app.use(express.static("public"));
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/DialogFlow", function(request, response){
         var intentName = request.body.queryResult.intent.displayName;
          
          var connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB
          });
          connection.connect();
  
/*=========================================================================*/  
         
         if(intentName == "Erro"){
           // Obtém a data/hora atual
  var data = new Date();

  // Guarda cada pedaço em uma variável
  var dia     = data.getDate();           // 1-31
  var dia_sem = data.getDay();            // 0-6 (zero=domingo)
  var mes     = data.getMonth();          // 0-11 (zero=janeiro)
  var ano2    = data.getYear();           // 2 dígitos
  var ano4    = data.getFullYear();       // 4 dígitos
  var hora    = data.getHours()-3;          // 0-23
  var min     = data.getMinutes();        // 0-59
  var seg     = data.getSeconds();        // 0-59
  var mseg    = data.getMilliseconds();   // 0-999
  var tz      = data.getTimezoneOffset(); // em minutos

  // Formata a data e a hora (note o mês + 1)
  var str_data = dia + '/' + (mes+1) + '/' + ano4;
  var str_hora = hora + ':' + min + ':' + seg;
            response.json({"fulfillmentMessages": [
  {
    "text": {
      "text": [
        "Servidor está *OK*\nUltima checagem feita às *"+str_hora+"* de *"+str_data+"*"
      ]
    }
  },
  {
    "text": {
      "text": [
        "_Caso esteja com problemas, retire seu roteador/modem da tomada por 20s e coloque novamente_"
      ]
    }
  }
]});
        }
  
        if(intentName == "Cadastro"){
          console.log('incluir')
          
          var NomeContato = request.body.queryResult.parameters['Nome'];
          var EmailContato = request.body.queryResult.parameters['Email'];
          var CpfContato = request.body.queryResult.parameters['CPF'];
          var CepContato = request.body.queryResult.parameters['CEP'];
          var VerContato = request.body.queryResult.parameters['VER'];
          var query = 'insert into Cadastro values ("'+NomeContato+'","'+EmailContato+'","'+CpfContato+'","'+CepContato+'")';
          if(VerContato == "sim" || VerContato == "Sim" || VerContato == "SIM"){
          
          connection.query(query, function (error, results, fields){
            if(error) throw error;
            connection.end();
              response.json({"fulfillmentText" : "Cadastro Efetuado com Sucesso!"});
          });
        }
          if(VerContato == "não" || VerContato == "Não" || VerContato == "NÃO"){
            response.json({"fulfillmentText" : "Digite *cadastro* para corrigir seus dados."});
          }
        }
  
        if(intentName == "teste"){
          var dol = require("./dolar")
          
          response.json({"fulfillmentMessages": [
  {
    "text": {
      "text": [
        "Servidor está *OK*\nUltima checagem feita às *"+dol+"* de *"+str_data
      ]
    }
  },
  {
    "text": {
      "text": [
        "_Caso esteja com problemas, retire seu roteador/modem da tomada por 20s e coloque novamente_"
      ]
    }
  }
]});
        }
          
  
  
});



// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
