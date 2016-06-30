window.addEventListener("load", getstationDetails(callbackfxn));

function getstationDetails(callbackIN)
{
    firebase.database().ref("100").once('value').then(function(snapshot) {
        callbackIN(snapshot.val())
    });
}


function callbackfxn(snap) {
    var stationDetails = [];
    var dateInfo = [];
    var waveHeight = [];
    for (var key in snap) {
        // skip loop if the property is from prototype
        if (!snap.hasOwnProperty(key)) continue;

        var obj = snap[key];
        stationDetails.push(obj);
    }

    for (var i = 0; i < stationDetails.length; i++) {
        console.log(snap[i]);
        waveHeight.push(stationDetails[i]["Height"]);
        dateInfo.push(stationDetails[i]["Hour"]);
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
                    "values": waveHeight,
                    "timestamp": dateInfo
                }
            ],
            "scale-x": {
                "label": {
                    "text":"Hour"
                }
            },
            "scale-y": {
                "label": {
                    "text":"Tide (m)"
                }
            }

        }
    });
    return stationDetails;
}