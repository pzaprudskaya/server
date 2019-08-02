const express = require('express');
var fs = require('fs');
const router = express.Router();


/* GET users listing. */
router.get('/:name', function(req, res, next) {
  fs.readFile('db-activity.json', 'utf8', function (err, data) {
    if (err) {
      res.send(500);
    }
    if (req.params.name) {
      let arr = [];
      (JSON.parse(data)).forEach(item => {
        if (item.name === req.params.name) {
          arr.push(item);
        }
      });
      res.json(arr);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

/* PUT (update) users listing. */
router.put('/', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.id) {
    fs.readFile('db-activity.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.id === body.id) {
            return body;
          }
        });

        fs.writeFile('db-activity.json', JSON.stringify(obj), 'utf8', function (err, data) {
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
router.delete('/', function (req, res, next) {
  res.json({
    message: 'delete method'
  })
});

/* POST users listing. */
router.post('/', function (req, res, next) {
  res.json({
    message: 'post method'
  })
});

module.exports = router;
