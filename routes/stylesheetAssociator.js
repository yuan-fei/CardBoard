exports.associate = function(xslt, xml){
    return xml.replace('<issues','<?xml-stylesheet type="text/xsl" href="'+xslt+'"?>\n<issues')
}
