
/**
 * Created by tmartin on 6/29/16.
 */

var cron = require('cron');
var firebase = require('firebase');
var request = require('request');

firebase.initializeApp({
    serviceAccount: 'Zing Chart Firebase Demo-cdccebc515c8.json',
    databaseURL: 'https://zing-chart-firebase-demo.firebaseio.com/'
});


var job = new cron.CronJob('0 * * * *', function() {

    updateStationData("100");
}, null, true);



function updateStationData(stationNumber) {
    console.log("here")
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
        };
    };
    request(options, callbackRequest);
}

function returnData(stationNumber,lineIn) {
    var i = 0;
    var dataArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    while (i < lineIn.length) {
        switch (i) {
            case 0: //YEAR
                dataArray[0] = parseInt(lineIn.slice(0,4));
                i = 5;
                break;
            case 5: //MONTH
                dataArray[1] = parseInt(lineIn.slice(5,7));
                i = 8;
                break;
            case 8: //DAY
                dataArray[2] = parseInt(lineIn.slice(8,10));
                i = 11;
                break;
            case 11: // HOUR
                dataArray[3] = (Math.abs(lineIn.slice(11,13)) - 7) % 24;
                i = 14;
                break;
            case 14: //MINUTE
                dataArray[4] = parseInt(lineIn.slice(14,16));
                i = 17;
                break;
            case 17: //WAVE HEIGHT
                dataArray[5] = parseFloat(lineIn.slice(17,22));
                i = 23;
                break;
            case 23: //WAVE PERIOD
                dataArray[6] = parseFloat(lineIn.slice(23,28));
                i = 29;
                break;
            case 29: //WAVE DIRECTION
                dataArray[7] = parseFloat(lineIn.slice(29,34));
                i = lineIn.length;
                break;

        }
    }
    saveToFireBase(stationNumber,dataArray);
}


function saveToFireBase(Station_id,arrayIn) {
    var object = {
        Year: arrayIn[0],
        Month: arrayIn[1],
        Day: arrayIn[2],
        Hour: arrayIn[3],
        Minute: arrayIn[4],
        Height: arrayIn[5],
        Period: arrayIn[6],
        Direction: arrayIn[7]
    };
    var newDataKey = firebase.database().ref().child(Station_id).push().key;
    var updates = {};
    updates['/' + Station_id + '/' + newDataKey] = object;
    console.log(object);
    return firebase.database().ref().update(updates);
}
