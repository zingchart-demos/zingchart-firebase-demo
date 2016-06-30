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
	    console.log(waveHeight);

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

/***/ }
/******/ ]);