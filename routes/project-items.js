const express = require('express');
var fs = require('fs');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile('db-project-items.json', 'utf8', function (err, data) {
    if (err) {
      res.send(500);
    }
    if (req.query.status){

      let arr = [] ;
      (JSON.parse(data)).forEach(item =>
      {
        if (item.status === req.query.status){
          arr.push(item);
        }
      });
      res.json(arr);

    }
    if (req.query.name){

      let arr = [] ;
      (JSON.parse(data)).forEach(item =>
      {
        if (item.name.indexOf(req.query.name) !== -1){
          arr.push(item);
        }
      });
      res.json(arr);

    }

    else {
      res.json(JSON.parse(data));
    }

  });
});

/* PUT (update) users listing. */
router.put('/', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.id) {
    fs.readFile('db-project-items.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.id === body.id) {
            return body;
          }
        });

        fs.writeFile('db-project-items.json', JSON.stringify(obj), 'utf8', function (err, data) {
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
router.delete('/delete', function (req, res, next) {
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
