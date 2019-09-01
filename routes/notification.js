const express = require('express');
var fs = require('fs');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('db-notification.json', 'utf8', function (err, data) {
    if (err) {
      res.send(500);
    }
    res.json(JSON.parse(data));
  });
});

/* PUT (update) users listing. */
router.put('/:name', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.name) {
    fs.readFile('db-notification.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.name === body.name) {
            return body;
          } else {
            return item;
          }
        });

        fs.writeFile('db-notification.json', JSON.stringify(obj), 'utf8', function (err, data) {
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
