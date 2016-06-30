window.addEventListener("load", getstationDetails(callbackfxn));

function getstationDetails(callbackIN)
{
    firebase.database().ref("100").once('value').then(function(snapshot) {
        callbackIN(snapshot.val())
    });
}


function callbackfxn(snap) {
    var stationDetails = [];
    var chartValues = [];
    for (var key in snap) {
        // skip loop if the property is from prototype
        if (!snap.hasOwnProperty(key)) continue;

        var obj = snap[key];
        stationDetails.push(obj);
    }
    for (var i = 0; i < stationDetails.length; i++) {
        console.log(stationDetails[i]["unixtime"]);
        chartValues.push([stationDetails[i]["unixtime"], stationDetails[i]["Height"]]);
    }
    zingchart.render({
        id:"waveHeight",
        width:"100%",
        height:400,
        data:{
            "type":"line",
            "title":{
                "text":"Wave Heights over time"
            },
            "plot":{
                "line-width":1,
                "aspect":"spline",
                "marker":{
                    "visible":false
                }
            },
            "series":[
                {
                    "values": chartValues
                }
            ],
            "scale-x": {
                "transform": {
                    "all": "%m/%d/%y  %h:%i %A",
                    'type' : "date"
                },
                "label": {
                    "text":"Hour"
                }
            },
            "scale-y": {
                "label": {
                    "text":"Wave Height (m)"
                }
            }
        }
    });

    return stationDetails;
}