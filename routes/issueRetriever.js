var request = require('request');

exports.retrieve=function(url,onRetrieved){

  // Configure the request
  var options = {
      url: url,
      method: 'GET'
  }

  // Start the request
  request(options, function (error, response, body) {
      if(error){
        console.log(error);
        onRetrieved(error,body)
      }
      else if(response.statusCode != 200){
        console.log('Status code: '+response.statusCode);
        onRetrieved(response.statusCode, body)
      }
      else {
          onRetrieved(error,body)
      }
  })
}
