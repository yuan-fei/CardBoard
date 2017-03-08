var http = require('http');
var fs = require('fs');
var Iconv = require('iconv').Iconv;

//url='http://redmine.system.pingxx.com/redmine/projects/big-data-team/issues.csv?key=777b560bce263240668e517fd6c28e540509b78a&offset=0&limit=100&query_id=135'

exports.retrieve = function(url, onRetrieved){
  http.get(url, function(res) {
      var buffers = [], size = 0;
      res.on('data', function(buffer) {
          buffers.push(buffer);
          size += buffer.length;
      });
      res.on('end', function() {
          var buffer = new Buffer(size), pos = 0;
          for(var i = 0, l = buffers.length; i < l; i++) {
              buffers[i].copy(buffer, pos);
              pos += buffers[i].length;
          }

          var gbk_to_utf8_iconv = new Iconv('GB18030', 'UTF-8');
          var utf8_buffer = gbk_to_utf8_iconv.convert(buffer);
          onRetrieved(null,utf8_buffer.toString());

      });
  }).on('error', function(e) {
      console.log("Got error: " + e.message);
      onRetrieved(e,null);
  });

}
