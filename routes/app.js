const boxrec= require('boxrec');
var fs = require('fs');
const request = require('request');
var cheerio = require('cheerio');
var id = 1; // initial starting loop of profile ID
var MongoClient = require('mongodb').MongoClient;
var urlMongo = "mongodb://localhost:27017/boxingData"; 


function getData(){
boxrec.login('boltaScola','5AUK3LI1WNEQQ').then(()=>{
  console.log("Login Successful. Fetching Data from server...");
  console.log("Fetching data...");
  url = `http://boxrec.com/boxer/${id++}`;
  var indexOfDebut =[];
  var rowData = [];
  var rowDataArr = [];
  var career = [{}];
  var last6 = [];
  var index=0;
  var career={
    'opp_name':[],
    'date':[],
    'location':[],
    'result':[],
    'type':[],
    'rounds':[],
    'wld':[],
    'last_six':[],
  };
  var career_data = [];
  request(url,function(err,res,body){
    if(!err){
      function getValue(element){
        return element.parent().next().text().trim();
      }
      const $ = cheerio.load(body);
      var boxer ={};
      $('b').filter(function () {
        if ($(this).text().indexOf('global ID') > -1) {
          boxer.globalId = parseInt(getValue($(this)), 10);
        }
        if ($(this).text().indexOf('bouts') > -1) {
          boxer.bouts = parseInt(getValue($(this)), 10);
        }
        if ($(this).text().indexOf('debut') > -1) {
          boxer.debut = getValue($(this));
        }
        if ($(this).text().indexOf('nationality') > -1) {
          boxer.nationality = getValue($(this));
        }
        if ($(this).text().indexOf('KOs') > -1) {
          boxer.knockoutPercentage = parseInt(getValue($(this)), 10);
        }
        if ($(this).text().indexOf('rounds') > -1) {
          boxer.rounds = parseInt(getValue($(this)), 10);
        }
        if ($(this).text().indexOf('stance') > -1) {
          boxer.stance = getValue($(this));
        }
        if ($(this).text().indexOf('division') > -1) {
          boxer.weightDivision = getValue($(this));
        }
        if ($(this).text().indexOf('height') > -1) {
          boxer.height = getValue($(this));
        }
        if ($(this).text().indexOf('reach') > -1) {
          boxer.reach = getValue($(this));
        }
        if ($(this).text().indexOf('residence') > -1) {
          boxer.residence = getValue($(this));
        }
        if ($(this).text().indexOf('birth place') > -1) {
          boxer.birthPlace = getValue($(this));
        }
      });
      boxer.dob = $('span[itemprop="birthDate"]').text();
      boxer.name = $('h1').text();
      boxer.wins = parseInt($('.profileWLD .bgW').text(), 10);
      boxer.winsKO = parseInt($('.profileWLD .textWon').text(), 10);
      boxer.draws = parseInt($('.profileWLD .bgD').text(), 10);
      boxer.losses = parseInt($('.profileWLD .bgL').text(), 10);
      boxer.lossesKO = parseInt($('.profileWLD .textLost').text(), 10);
      $('.drawRowBorder').filter(function(i,e){
        rowData[i] = $(this).text();
        rowDataArr[i]=rowData[i].split('\n');
        rowDataArr[i]=rowDataArr[i].map(Function.prototype.call, String.prototype.trim);
        rowDataArr[i]=rowDataArr[i].filter(function(ele){
          return ele;
        });
        career.date[i] = rowDataArr[i][0];
        career.wld[i] = rowDataArr[i][2];
        if(career.wld[i]=='debut'){
          indexOfDebut[index]=i;
          index++;
        }
        career.location[i] = rowDataArr[i][3];
        career.result[i] = rowDataArr[i][4];
        career.type[i] = rowDataArr[i][5];
        career.rounds[i] = rowDataArr[i][6];
    });
    $('.personLink').each(function(index,element){
      career.opp_name.push($(this).text().trim());
    });
      $('.last6').each(function(i,e){
        // last_six[i]=$(this).parent().children().attr('class');
        if($(this).hasClass('bgL')){
          last6.push('L');
        }
        else if($(this).hasClass('bgW')){
          last6.push('W');
        }
        else if($(this).hasClass('bgD')){
          last6.push('D');
        }
        else if($(this).hasClass('bgNC')){
          last6.push('NC');
        }
        else if($(this).hasClass('bgBlank')){
          last6.push('Blank');
        }
      });
      var counter = 0;
      for(var i = 0 ; i<last6.length;i=i+6){
        career.last_six[counter] = last6.slice(i,i+6);
        counter++;
      }
      for(var ind=0;ind<indexOfDebut.length;ind++){
        career.last_six.splice(indexOfDebut[ind],0,['-','-','-','-','-','-']);
      }

    }
    for(i=0;i<career.opp_name.length;i++){
      career_data[i]={"opp_name":career.opp_name[i],
                      "date":career.date[i],
                      "w-l-d":career.wld[i],
                      "venue":career.location[i],
                      "result":career.result[i],
                      "type":career.type[i],
                      "rounds":career.rounds[i],
                      "last_six":career.last_six[i]
          }
    }
    boxer.career = career_data;
    console.log("Data Fetched. Writing on file")
    if(boxer.name == "" || boxer.name.length < 2) {
      console.log("Data Fetched. This Boxer Does Not Existed!!. ")
    }
    else {
      fs.appendFile("output.json", JSON.stringify(boxer)+"\n", function(err) {
        if(err) {
            return console.log(err);
        }
        // This is for inserting to DB
        // The boxer holds the dataset
        MongoClient.connect(urlMongo, function (err, db) {
          if (err) throw err;
          db.collection("data").insertOne(boxer, function (errr, result) { 
            if (errr)
              console.log(errr);
            else {
              console.log("1 Recorded Inserted for boxer ID: "+boxer.globalId);
              db.close();
            }
          });
        });
      }); 
    }
  });
})
.catch(error=>{
  console.log(error);
});
}
setInterval(getData,10000);