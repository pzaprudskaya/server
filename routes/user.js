const express = require('express');
var fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {

    fs.readFile('db-user.json', 'utf8', function (err, data) {
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
router.put('/', function (req, res, next) {
  const body = req.body;
  let obj = null;

  if (body && body.id) {
    fs.readFile('db-users.json', 'utf8', function (err, data) {
      if (err) {
        res.send(500);
      } else {
        obj = JSON.parse(data);
        obj = obj.map(item => {
          if (item.id === body.id) {
            return body;
          }
        });

        fs.writeFile('db-users.json', JSON.stringify(obj), 'utf8', function (err, data) {
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
router.post('/', verifyToken, function (req, res, next) {
    jwt.verify(req.token, 'secretkey', (err, myUser) => {
        if(err) {
            res.sendStatus(403);
        } else {
            fs.readFile('db-user.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    res.send(500);
                } else {
                    obj = JSON.parse(data);
                    req.body.id = obj.length;
                    obj.push(req.body);
                    json = JSON.stringify(obj);
                    fs.writeFile('db-user.json', json, 'utf8', function (err, data){
                        if (err) {
                            res.send(500);
                        }
                    });
                }});
            fs.readFile('db-activity.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    res.send(500);
                } else {

                    obj = JSON.parse(data);
                    myUser = {id: obj.length, name: req.body.name, role: myUser.user.role, companies: [myUser.user.company]};
                    obj.push(myUser);
                    json = JSON.stringify(obj);
                    fs.writeFile('db-activity.json', json, 'utf8', function (err, data){
                        if (err) {
                            res.send(500);
                        }
                    });
                }});
        }
    });

});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
