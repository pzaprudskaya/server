const express = require('express');
var fs = require('fs');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
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
        if (err) {
            res.sendStatus(403);
        } else {
            fs.readFile('db-user.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    res.send(500);
                } else {
                    obj = JSON.parse(data);
                    req.body.id = obj.length;
                    obj.push(req.body);
                    json = JSON.stringify(obj);
                    fs.writeFile('db-user.json', json, 'utf8', function (err, data) {
                        if (err) {
                            res.send(500);
                        }
                    });

                }
            });
            fs.readFile('db-activity.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    res.send(500);
                } else {

                    obj = JSON.parse(data);
                    myUser = {
                        id: obj.length,
                        name: req.body.name,
                        role: myUser.user.role,
                        companies: [myUser.user.company]
                    };
                    obj.push(myUser);
                    json = JSON.stringify(obj);
                    fs.writeFile('db-activity.json', json, 'utf8', function (err, data) {
                        if (err) {
                            res.send(500);
                        }
                    });
                }
            });
            fs.readFile('db-employee-profile.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    res.send(500);
                } else {
                    obj = JSON.parse(data);
                    const myProfile = {
                        photoUrl: req.body.photoUrl,
                        name: req.body.name,
                        role: req.body.role,
                        workload: 0,
                        email: req.body.email,
                        phone: "",
                        employeeProjects: [],
                        yearsWorkload: [],
                        timesheetsPendingApproval: [],
                        notificationsSettings: []
                    };
                    obj.push(myProfile);
                    json = JSON.stringify(obj);
                    fs.writeFile('db-employee-profile.json', json, 'utf8', function (err, data) {
                        if (err) {
                            res.send(500);
                        }
                    });
                }
            });
            fs.readFile('db-employee-items.json', 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                } else {
                    obj = JSON.parse(data);
                    req.body.id = obj.length;
                    obj = obj.map(item => {
                        if (item.email === req.body.email) {
                            item.photoUrl = req.body.photoUrl;
                            item.name = req.body.name;
                            item.role = req.body.role;
                            item.status = 'active';
                            console.log('items: ' + item);
                            return item;
                        } else {
                            return item;
                        }
                    });

                    fs.writeFile('db-employee-items.json', JSON.stringify(obj), 'utf8', function (err, data) {
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
            fs.readFile('db-logs-by-week.json', 'utf8', function readFileCallback(err, data) {
                if (err) {
                    res.send(500);
                } else {
                    obj = JSON.parse(data);
                    obj.push({name: req.body.name, data: []});
                    json = JSON.stringify(obj);
                    console.log(obj);
                    fs.writeFile('db-logs-by-week.json', json, 'utf8', function (err, data) {
                        if (err) {
                            res.send(500);
                        }
                    });
                }
            });
        }
    });

});
router.post('/add', function (req, res, next) {

    fs.readFile('db-user.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            res.send(500);
        } else {
            obj = JSON.parse(data);
            obj.push({id: obj.length, email: req.body.email, name: req.body.name, password: req.body.password });
            json = JSON.stringify(obj);
            fs.writeFile('db-user.json', json, 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                }
            });
        }
    });
    fs.readFile('db-activity.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            res.send(500);
        } else {
            obj = JSON.parse(data);
            myUser = {id: obj.length, name: req.body.name, role: 'default role', companies: []};
            obj.push(myUser);
            json = JSON.stringify(obj);
            fs.writeFile('db-activity.json', json, 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                }
            });
        }
    });
    fs.readFile('db-employee-profile.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            res.send(500);
        } else {
            obj = JSON.parse(data);
            const myProfile = {
                photoUrl: req.body.photoUrl,
                name: req.body.name,
                role: 'default role',
                workload: 0,
                email: req.body.email,
                phone: "",
                employeeProjects: [],
                yearsWorkload: [],
                timesheetsPendingApproval: [],
                notificationsSettings: []
            };
            obj.push(myProfile);
            json = JSON.stringify(obj);
            fs.writeFile('db-employee-profile.json', json, 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                }
            });
        }
    });
    fs.readFile('db-employee-items.json', 'utf8', function (err, data) {
        if (err) {
            res.send(500);
        } else {
            obj = JSON.parse(data);
            obj.push({id: obj.length, photoUrl: req.body.photoUrl, name: req.body.name, role: 'default role', email: req.body.email,
                planned: 0, actual: 0, status: "active", pendingApprovalTimesheets: []});
            json = JSON.stringify(obj);
            fs.writeFile('db-employee-items.json', json, 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                }
            });
        }
    });
    fs.readFile('db-logs-by-week.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            res.send(500);
        } else {
            obj = JSON.parse(data);
            obj.push({name: req.body.name, data: []});
            json = JSON.stringify(obj);
            console.log(obj);
            fs.writeFile('db-logs-by-week.json', json, 'utf8', function (err, data) {
                if (err) {
                    res.send(500);
                }
            });
        }
    });

});

router.post('/login', (req, res) => {
    let userData = req.body;
    fs.readFile('db-user.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            (JSON.parse(data)).forEach(item => {
                if (item.email === userData.email) {
                    let payload = {subject: item.name};
                    let token = jwt.sign(payload, 'secretkey');
                    res.status(200).send({token});
                }
            });
        }
    });
});

router.post('/verify', verifyToken, (req, res) => {
    console.log('Token: ' + req.token);
    jwt.verify(req.token, 'secretkey', (err, myUser) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.status(200).send(myUser);
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;
