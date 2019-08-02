const express = require('express');
var fs = require('fs');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('db-logs.json', 'utf8', function (err, data) {
    if (err) {
      res.send(500);
    }
    res.json(JSON.parse(data));
  });
});


/* PUT (update) users listing. */
router.put('/', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.id) {
    fs.readFile('db-logs.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.id === body.id) {
            return body;
          }
        });

        fs.writeFile('db-logs.json', JSON.stringify(obj), 'utf8', function (err, data) {
          if (err) {
            res.send(500);
          } else {
            res.json({
              success: true,
              data: obj
            })
          }
        });
      }
    });
  }
});

/* DELETE users listing. */
router.delete('/:name', function (req, res, next) {
  //console.log(util.inspect(req.body));
});

/* POST users listing. */
router.post('/', function (req, res, next) {
  fs.readFile('db-logs.json', 'utf8', function readFileCallback(err, data){
    if (err){
      res.send(500);
    } else {
      obj = JSON.parse(data);
      obj.push(req.body);
      json = JSON.stringify(obj);
      fs.writeFile('db-logs.json', json, 'utf8', function (err, data){
        if (err) {
          res.send(500);
        }
      });
    }});
});

module.exports = router;
