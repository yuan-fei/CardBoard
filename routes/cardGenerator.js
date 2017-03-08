var fs = require('fs');
var libxslt = require('libxslt');
var libxmljs = libxslt.libxmljs;


function generateCards(xml, template, onFormatted) {
    var stylesheetObj = libxmljs.parseXml(template, {nocdata: true});
    var stylesheet = libxslt.parse(stylesheetObj);

    var document = libxmljs.parseXml(xml);
    stylesheet.apply(document, onFormatted);
}

exports.generateTaskCards = function (xml, onFormatted) {
    var story_card_template = fs.readFileSync(path.join(__dirname, '../public/task_card_template.xslt'), 'utf8');
    generateCards(xml, story_card_template, onFormatted);
}

exports.generateStoryCards = function (xml, onFormatted) {
    var story_card_template = fs.readFileSync(path.join(__dirname, '../public/story_card_template.xslt'), 'utf8');
    generateCards(xml, story_card_template, onFormatted);
}
