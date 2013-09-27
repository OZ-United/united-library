var fs = require('fs');
var csv = require('csv');

module.exports.parse = function(file, cb){
  csv()
  .from.path(process.cwd() + '/public/csv/' + file, {
    delimiter: ';',
    escape: '"',
    columns: true
  })
  .to.array( function(data, count){
    cb(null, data, count);
  });
};

// parse('books.csv', function(err, data){
//   console.log(data);
// });