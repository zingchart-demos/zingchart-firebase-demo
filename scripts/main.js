window.addEventListener("load", getstationDetails(callbackfxn));

function getstationDetails(callbackIN)
{
    var stationRef = firebase.database().ref("100");
    stationRef.once('value').then(function(snapshot) {
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
    var minHeight = stationDetails[0]["Height"];
    for (var i = 0; i < stationDetails.length; i++) {
        if (stationDetails[i]["Height"] < minHeight)
        {
            minHeight = stationDetails[i]["Height"];
        }
        chartValues.push([stationDetails[i]["unixtime"], stationDetails[i]["Height"]]);
    }
    zingchart.render({
        id:"waveHeight",
        width:"100%",
        height:"100%",
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
                    "all": "%m/%d/%Y  %h:%i %A",
                    'type' : "date"
                },
                "label": {
                    "text":"Hour"
                }
            },
            "scale-y": {
                "minValue" : minHeight,
                "label": {
                    "text":"Wave Height (m)"
                }
            }
        }
    });

    return stationDetails;
}