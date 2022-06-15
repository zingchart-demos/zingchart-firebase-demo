const fs = require('fs');
var JSSoup = require('jssoup').default;
let request = require('request');

let jsonData = {};

// main function execute used as async wrapper
async function main() {
  // Get wave height and period data
  request('http://cdip.ucsd.edu/m/products/spectrum_table/?stn=100p1', function(err, response, data) {
    let index = 0;
    let soup = new JSSoup(data);
    let tableRows = soup.findAll('tr');
    tableRows.forEach((row, i) => {
      if (i !== 0) {
        jsonData[index] = {
          Height: parseInt(row.contents[1].text),
          Period: parseInt(row.contents[2].text),
          unixtime: Math.floor(new Date(row.contents[0].text).getTime() / 1000),
        };
      };
      index++;
    });

    // Get wave direction data
    request('http://cdip.ucsd.edu/m/products/9band_direction/?stn=100p1', function(err, response, data) {
      let index = 0;
      let soup = new JSSoup(data);
      let tableRows = soup.findAll('tr');

      tableRows.forEach((row, i) => {
        if (i !== 0) {
          jsonData[index].Direction = parseInt(row.contents[1].text);
        }
        index++;
      });

      // Write as JSON file
      fs.writeFile('chartData.json', JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err)
          return
        }
      })
    });
  });
};

main();