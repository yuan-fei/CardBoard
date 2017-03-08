var config = require('./config.json')
var fs = require('fs');
var path = require('path')
var issueRetriever = require('./issueRetriever')
var taskRetriever = require('./taskRetriever')
var csvConverter = require('./convertcsv')
var assoc = require('./stylesheetAssociator')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

var api_key = config.redmine_api_key
var current_sprint_pbis_url = config.current_sprint_pbis_url+'&key='+api_key;
var current_sprint_tasks_url = config.current_sprint_tasks_url+'&key='+api_key;


router.get('/storycards', function (req, res, next) {
    issueRetriever.retrieve(current_sprint_pbis_url,
        function (err, issues) {
            if (err) {
                res.send(err)
            }
            else {
                res.end(assoc.associate('story_card_template.xslt', issues))
            }
        }
    );
});

router.get('/taskcards', function (req, res, next) {
    taskRetriever.retrieve(current_sprint_tasks_url,
        function (err, issues) {
            if (err) {
                res.send(err)
            }
            else {
                csvConverter.convert(issues,
                    function (err, issues) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.end(assoc.associate('task_card_template.xslt', issues))
                        }
                    }
                );
            }
        }
    );
});


module.exports = router;
