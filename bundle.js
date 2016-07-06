/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	document.getElementById("person").onload = function () {
	    document.getElementById("person").style.visibility = "visible";
	};
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
	            },
	            'guide':{
	                "plot-label":{
	                    "visible":0
	                },
	                "scale-label":{
	                    "visible":0
	                }
	            }

	        }
	    });
	    var personImage = Snap("#person");
	    var waterLevel = personImage.select("#waterLevel");
	    var top = personImage.select("#top");
	    top.attr({
	        mask: waterLevel
	    });
	    num = 0;
	    function animationLoop(height) {
	        console.log(str = "M 0,"+ (820 - (height * 90 + Math.random()*(15))).toString()+ " C 0," + (820- (height * 90 - Math.random()*(3))).toString() + " 30," + (820- (height * 90 - Math.random()*(3))).toString() + " 45,"+ (820 - (height * 90 + Math.random()*(15))).toString()+ " 60," + (820- (height * 90 - Math.random()*(3))).toString() + " 75," + (820- (height * 90 - Math.random()*(3))).toString() + " 90,"+ (820 - (height * 90 + Math.random()*(15))).toString() + " 105," + (820- (height * 90 - Math.random()*(3))).toString() + " 120," + (820- (height * 90 - Math.random()*(3))).toString() + " 135,"+ (820 - (height*90 + Math.random()*(15))).toString() + " 150," + (820- (height * 90 - Math.random()*(3))).toString() + " 165," + (820- (height * 90 - Math.random()*(3))).toString() + " 180,"+ (820 - (height * 90 + Math.random()*(15))).toString()+ " 195," + (820- (height * 90 - Math.random()*(3))).toString() + " 210," + (820- (height * 90 - Math.random()*(3))).toString() + " 225,"+ (820 - (height * 90 + Math.random()*(15))).toString() + " 240," + (820- (height * 90 - Math.random()*(3))).toString() + " 255," + (820- (height * 90 - Math.random()*(3))).toString() + " 270,"+ (820 - (height * 90 + Math.random()*(15))).toString() + " 285," + (820- (height * 90 - Math.random()*(3))).toString() + " 300," + (820- (height * 90 - Math.random()*(3))).toString() + " 315," + (820 - (height * 90 + Math.random()*(15))).toString() + " 330,"+ (820- (height * 90 - Math.random()*(3))).toString() + " 360,"+ (821.5- (height * 90 - Math.random()*(3))).toString() + " 360,"+ (820 - (height * 90 + Math.random()*(15))).toString() + " L 360,820 0,820 Z"
	        )
	        waterLevel.animate({
	            d:str}, 700);
	    }
	    zingchart.load = function () {
	        num = chartValues[chartValues.length-1][1];
	    };
	    zingchart.guide_mousemove = function(p) {
	        if (isNaN(p["items"][0]["value"]) == false)
	        {
	            num = p["items"][0]["value"];
	        }
	        else
	        {
	            num = chartValues[chartValues.length-1][1];
	        }
	    };

	    var loop = setInterval(function () {
	        animationLoop(num);
	    },700)
	    return stationDetails;
	}





/***/ }
/******/ ]);