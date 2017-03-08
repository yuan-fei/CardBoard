var config = require('./config.json')
var fs = require('fs');
var path = require('path')
var cardGen = require('./cardGenerator')
var issueRetriever = require('./issueRetriever')
var taskRetriever = require('./taskRetriever')
var csvConverter = require('./convertcsv')
var assoc = require('./stylesheetAssociator')
var express = require('express');
var router = express.Router();

var xmlBaseQuery = 'http://redmine.system.pingxx.com/redmine/projects/big-data-team/issues.xml?key=777b560bce263240668e517fd6c28e540509b78a&offset=0&limit=100';
var csvBaseQuery = 'http://redmine.system.pingxx.com/redmine/projects/big-data-team/issues.csv?key=777b560bce263240668e517fd6c28e540509b78a&offset=0&limit=100';


router.get('/storycards', function (req, res, next) {
    //var stories = fs.readFileSync('stories.xml', 'utf8');
    issueRetriever.retrieve(xmlBaseQuery + '&query_id=133',
        function (err, issues) {
            if (err) {
                res.send(err)
            }
            else {
                cardGen.generateStoryCards(issues,
                    function (err, result) {
                        if (err) {
                            res.send(err)
                        }
                        else {
                            res.end(result.toString())
                        }
                    }
                );
            }
        }
    );
});

router.get('/taskcards', function (req, res, next) {
    //var stories = fs.readFileSync('stories.xml', 'utf8');
    taskRetriever.retrieve(csvBaseQuery + '&query_id=135',
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
                            cardGen.generateTaskCards(issues,
                                function (err, result) {
                                    if (err) {
                                        res.send(err)
                                    }
                                    else {
                                        res.end(result.toString())
                                    }
                                }
                            )
                        }
                    }
                );
            }
        }
    );
});
