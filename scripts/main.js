window.addEventListener("load", getstationDetails(callbackfxn));

function getstationDetails(callbackIN)
{
    var stationRef = firebase.database().ref("100");
    stationRef.once('value').then(function(snapshot) {
        callbackIN(snapshot.val())
    });
}


function callbackfxn(snap) {
    //["#1d3955", "#224264", #647A92, "#eef3f9"]
    var stationDetails = [];
    var chartValues = [];
    var arrows = [];
    var degrees = [];
    for (var key in snap) {
        // skip loop if the property is from prototype
        if (!snap.hasOwnProperty(key)) continue;
        var obj = snap[key];
        stationDetails.push(obj);
    }
    for (var i = 0; i < stationDetails.length; i++) {
        chartValues.push([(stationDetails[i]["unixtime"] - (3600000 * 7)), stationDetails[i]["Height"] * 3.28084]);
        degrees.push(stationDetails[i]["Direction"]);
        arrows.push({
            backgroundColor: "#224264",
            borderColor: "#224264",
            length: stationDetails[i]["Period"] * 3, //length of arrow
            direction: "bottom",
            from: {
                hook: "node:plot=0,index=" + i
            },
            angle: stationDetails[i]["Direction"]+180
        })
    }
    zingchart.render({
        id: "waveHeight",
        width: "100%",
        height: "100%",
        data: {
            "background-color": "#eef3f9",
            "type": "line",
            "arrows": arrows,
            "title": {
                "text": "Wave Heights over time",
                "color": "#1d3955"
            },
            "chart": {
                "background-color": "#eef3f9"
            },
            "plot": {
                "line-color": "#647A92",
                "line-width": 3,
                "aspect": "spline",
                "marker": {
                    "visible": false
                }
            },
            "series": [
                {
                    "values": chartValues
                }
            ],
            "scale-x": {
                "transform": {
                    "all": "%m/%d/%Y  %h:%i %A",
                    'type': "date"
                },
                "label": {
                    "text": "Time (UTC)",
                    "color": "#1d3955"
                },
                "line-color": "#d2d9e0",
                "line-width": 1.5,
                "tick": {
                    "line-color": "#d2d9e0",
                    "line-width": 1.5,
                }
            },
            "scale-y": {
                "label": {
                    "text": "Wave Height (ft)",
                    "color": "#1d3955",
                },
                "line-color": "#d2d9e0",
                "line-width": 1.5,
                "tick": {
                    "line-color": "#d2d9e0",
                    "line-width": 1.5,
                }
            }
        }
    });

    return stationDetails;
}
