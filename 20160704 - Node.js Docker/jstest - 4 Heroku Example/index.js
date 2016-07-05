var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));
app.get('/', function (req, res) {
  res.end('Hello World from Express!');
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
