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

          .card, .userStoryCard, .bugCard {
            border: solid 1px black; width: 8cm; height: 5.3cm;
            display: inline-block; margin: 3mm; position: relative;
            overflow: hidden;
          }

          .title { font-size: 14px; font-weight: bold; width: 6cm; height:0.9cm; display: inline-block; overflow: hidden;}

          .description, .title, .estimation, .sprintDetails { padding: 2mm; border: solid 1px black;}

          .description { position: absolute; font-size: 12px; width: 7.55cm; height:3.5cm;}

          .estimation { font-size: 14px; font-weight: bold; width: 1.1cm; height:0.9cm; text-align: right; display: inline-block; position: absolute;}

          .sprintDetails { position: absolute; bottom: 0px; left: 0px; font-size: 10px; color: gray; }

        </style>
      </head>

      <body>

        <xsl:for-each select="issue">

          <div class="card">

            <xsl:choose>
              <xsl:when test="tracker/@name = 'Requirement'">
                <xsl:attribute name="class">userStoryCard</xsl:attribute>
              </xsl:when>
              <xsl:when test="tracker/@name = 'Issue'">
                <xsl:attribute name="class">bugCard</xsl:attribute>
              </xsl:when>
              <xsl:otherwise>
                <xsl:attribute name="class">card</xsl:attribute>
              </xsl:otherwise>
            </xsl:choose>

            <div>
              <span class="title">[<xsl:value-of select="id" />]&#160;<xsl:value-of select="subject" /></span>
              <span class="estimation">
                <xsl:value-of select="custom_fields/custom_field[@name='Story Points']/value" /> sp
              </span>
            </div>

            <div class="description">
              <xsl:apply-templates select='description'/>
            </div>

          </div>

        </xsl:for-each>

      </body>
    </html>
  </xsl:template>

  <xsl:template match="description">
      <xsl:apply-templates/>
  </xsl:template>

   <xsl:template match="text()" name="insertBreaks">
     <xsl:param name="pText" select="."/>

     <xsl:choose>
       <xsl:when test="not(contains($pText, '&#xA;'))">
         <xsl:copy-of select="$pText"/>
       </xsl:when>
       <xsl:otherwise>
         <xsl:value-of select="substring-before($pText, '&#xA;')"/>
         <br />
         <xsl:call-template name="insertBreaks">
           <xsl:with-param name="pText" select=
             "substring-after($pText, '&#xA;')"/>
         </xsl:call-template>
       </xsl:otherwise>
     </xsl:choose>
   </xsl:template>
</xsl:stylesheet>
