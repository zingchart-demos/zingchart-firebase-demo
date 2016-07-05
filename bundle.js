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


/***/ }
/******/ ]);