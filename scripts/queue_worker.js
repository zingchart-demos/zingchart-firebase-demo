
/**
 * Created by tmartin on 6/29/16.
 */

var cron = require('cron');
var firebase = require('firebase');
var request = require('request');
var requirejs = require('requirejs');

firebase.initializeApp({
    serviceAccount: 'Zing Chart Firebase Demo-cdccebc515c8.json',
    databaseURL: 'https://zing-chart-firebase-demo.firebaseio.com/'
});


var job = new cron.CronJob('5 * * * *', function() {
    updateStationData("100");
}, null, true);


function updateStationData(stationNumber) {
    getHTML(stationNumber, getLineIn);
}

function getLineIn(stationNumber,html) {
    var indexLast = html.indexOf("</pre>") - 1;
    var indexFirst = indexLast - 78;
    returnData(stationNumber,html.slice(indexFirst, indexLast));
}


function getHTML(stationNumber) {
    var options = {
        url: 'http://cdip.ucsd.edu/data_access/justdar.cdip?'+stationNumber+'+pm',
        headers: {
            "Access-Control-Allow-Origin": "http://cdip.ucsd.edu/"
        }
    };
    function callbackRequest(error, response, html) {
        if (!error && response.statusCode == 200) {
            getLineIn(stationNumber,html);
        }
    }
    request(options, callbackRequest);
}

function returnData(stationNumber,lineIn) {
    var i = 0;
    var dataArray = [0,0,0,0];
    var unixtime = Date.parse(lineIn.slice(0,4) + "-" + lineIn.slice(5,7) + "-" + lineIn.slice(8,10) + " " + lineIn.slice(11,13) + ":" + lineIn.slice(14,16));
    console.log(unixtime);
    while (i < lineIn.length) {
        switch (i) {
            case 0: //DATE
                dataArray[0] = unixtime;
                i = 17
                break;
            case 17: //WAVE HEIGHT
                dataArray[1] = parseFloat(lineIn.slice(17,22));
                i = 23;
                break;
            case 23: //WAVE PERIOD
                dataArray[2] = parseFloat(lineIn.slice(23,28));
                i = 29;
                break;
            case 29: //WAVE DIRECTION
                dataArray[3] = parseFloat(lineIn.slice(29,34));
                i = lineIn.length;
                break;
        }
    }
    saveToFireBase(stationNumber,dataArray);
}


function saveToFireBase(Station_id,arrayIn) {
    var object = {
        unixtime: arrayIn[0],
        Height: arrayIn[1],
        Period: arrayIn[2],
        Direction: arrayIn[3]
    };
    var newDataKey = firebase.database().ref().child(Station_id).push().key;
    var updates = {};
    updates['/' + Station_id + '/' + newDataKey] = object;
    console.log(object);
    return firebase.database().ref().update(updates);
}
