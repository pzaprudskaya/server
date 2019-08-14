const express = require('express');
var fs = require('fs');
const router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {

    fs.readFile('db-project-items.json', 'utf8', function (err, data) {
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

/* PUT (update) users listing. */
router.put('/:name', function (req, res, next) {

  const body = req.body;
  let obj = null;

  if (body && body.name) {
    fs.readFile('db-project-items.json', 'utf8', function (err, data) {
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
    fs.readFile('db-project-items.json', 'utf8', function readFileCallback(err, data){
        if (err){
            res.send(500);
        } else {
            obj = JSON.parse(data);
            obj.push(req.body);
            json = JSON.stringify(obj);
            fs.writeFile('db-project-items.json', json, 'utf8', function (err, data){
                if (err) {
                    res.send(500);
                }
            });
        }});
});

module.exports = router;
