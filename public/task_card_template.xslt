<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"  encoding="utf-8"
              doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"
              doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" />

  <xsl:template match="/issues">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Card Board</title>
        <style type="text/css">

          body { font-family: arial; }

          .card {
            border: solid 1px black; width: 8cm; height: 5.3cm;
            display: inline-block; margin: 3mm; position: relative;
            overflow: hidden;
          }

          .title { font-size: 14px; font-weight: bold; width: 7.55cm; height:3.51cm; display: inline-block; overflow: hidden;}

          .title, .estimation, .assignee { padding: 2mm; border: solid 1px black;}

          .assignee { font-size: 14px; font-weight: bold; width: 6cm; height:0.9cm;  text-align: center; display: inline-block; }

          .estimation { font-size: 14px; font-weight: bold; width: 1.1cm; height:0.9cm; text-align: center; display: inline-block; position: absolute}

        </style>
      </head>

      <body>

        <xsl:for-each select="issue">

          <div class="card">
            <div class="title">[<xsl:value-of select="parent/@id" />]&#160;<xsl:value-of select="subject" /></div>
            <div>
              <span class="assignee">
                <xsl:value-of select="assigned_to/@name" />
              </span>
              <span class="estimation">
                <xsl:value-of select="estimated_hours" /> h
              </span>
            </div>

          </div>

        </xsl:for-each>

      </body>
    </html>
  </xsl:template>


</xsl:stylesheet>
