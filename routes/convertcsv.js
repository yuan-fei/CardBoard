var CSV2XML = require('./csv2xml');
var memStream = require('memory-streams');
var fs = require('fs');

exports.convert=function(issues, onConverted){
  // create new parser by passing an configuration to the parser
  var parser = new CSV2XML({
          primaryKey:'#',
          sorted: true,
          mapping: {
              '#': 'issues/issue/@id',
              '跟踪': 'issues/issue/tracker/@name',
              '父任务': 'issues/issue/parent/@id',
              '主题': 'issues/issue/subject/text()',
              '预计耗时': 'issues/issue/estimated_hours/text()',
              '指派给': 'issues/issue/assigned_to/@name',
              '状态': 'issues/issue/status/@name',
              'Sprint': 'issues/issue/sprint/text()',
          }
      }
  );

  // pipe a readable stream to the parser and then to a writable stream
  // var input = new stream.Readable();
  // input._read = function noop() {};
  // input.push(issues);
  // input.push(null);
  console.log(issues);

  var input = new memStream.ReadableStream(issues);
  var output = new memStream.WritableStream();
  input.pipe(parser).pipe(output);
  input.append(null);
  parser.on('readable', function() {
    // Output the content as a string
    //console.log(output.toString());
    onConverted(null, output.toString());
  });
}
