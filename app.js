var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var activityRouter = require('./routes/activity');
var logsRouter = require('./routes/logs');
var timesheetRouter = require('./routes/timesheet');
var employeeRouter = require('./routes/employee');
var projectRouter = require('./routes/project');
var assignmentRouter = require('./routes/assignment');
var integrationRouter = require('./routes/integration');
var settingsRouter = require('./routes/settings');
var notificationRouter = require('./routes/notification');
var employeeItemsRouter = require('./routes/employee-items');
var projectItemsRouter = require('./routes/project-items');
var employeeProfileRouter = require('./routes/employee-profile');
var companyProjectandRoleRouter = require('./routes/company-projects-and-role')



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/activity', activityRouter);
app.use('/logs', logsRouter);
app.use('/timesheet', timesheetRouter);
app.use('/employee', employeeRouter);
app.use('/project', projectRouter);
app.use('/assignment', assignmentRouter);
app.use('/integration', integrationRouter);
app.use('/settings', settingsRouter);
app.use('/notification', notificationRouter);
app.use('/employee-items', employeeItemsRouter);
app.use('/project-items', projectItemsRouter);
app.use('/employee-profile', employeeProfileRouter);
app.use('/company-projects', companyProjectandRoleRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: true});
});

module.exports = app;
