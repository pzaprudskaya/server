const express = require('express');
var fs = require('fs');
const router = express.Router();

router.get('/', function(req, res, next) {

  fs.readFile('db-project.json', 'utf8', function (err, data) {
        if (err) {
          res.send(500);
        } else {
          const _data = JSON.parse(data);

          let keys = Object.keys(req.query);
          let numOfKeys = keys.length;
          let filteredData = [];
          let isExist = true;

          if (keys && numOfKeys) {
            _data.forEach(item => {
              keys.forEach(key => {
                if (isExist && item.hasOwnProperty(key)
                    && item[key].indexOf(req.query[key]) === -1) {
                  isExist = false;
                }
              });
              isExist ? filteredData.push(item) : isExist = true;
            });
            res.json(filteredData);
          } else {
            res.json(_data);
          }
        }

      }
  );
});

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  fs.readFile('db-project.json', 'utf8', function (err, data) {
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
router.put('/:name', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.id) {
    fs.readFile('db-project.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.id === body.id) {
            return body;
          }
          else {
            return item;
          }
        });

        fs.writeFile('db-project.json', JSON.stringify(obj), 'utf8', function (err, data) {
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

router.post('/', function (req, res, next) {
  fs.readFile('db-project.json', 'utf8', function readFileCallback(err, data){
    if (err){
      res.send(500);
    } else {
      obj = JSON.parse(data);
      req.body.id = obj.length;
      obj.push(req.body);
      json = JSON.stringify(obj);
      fs.writeFile('db-project.json', json, 'utf8', function (err, data){
        if (err) {
          res.send(500);
        }
      });
    }});
});
module.exports = router;
