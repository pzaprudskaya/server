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
  fs.readFile('db-notification.json', 'utf8', function (err, data) {
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
