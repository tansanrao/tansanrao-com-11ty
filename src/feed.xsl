<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/atom:feed/atom:title"/></title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          body {
            max-width: 800px;
            margin: 0 auto;
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            padding: 2rem 1rem;
            color: #222;
            background: #f9f9f9;
          }
          header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            color: #333;
          }
          .subtitle {
            color: #666;
            margin: 0;
          }
          article {
            margin-bottom: 2rem;
            padding: 1rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          article h2 {
            margin: 0 0 0.5rem 0;
          }
          article h2 a {
            color: #2563eb;
            text-decoration: none;
          }
          article h2 a:hover {
            text-decoration: underline;
          }
          .meta {
            color: #666;
            font-size: 0.9rem;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background: #111;
              color: #eee;
            }
            h1 {
              color: #fff;
            }
            article {
              background: #222;
              box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }
            article h2 a {
              color: #60a5fa;
            }
            .subtitle, .meta {
              color: #999;
            }
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="/atom:feed/atom:title"/></h1>
          <p class="subtitle"><xsl:value-of select="/atom:feed/atom:subtitle"/></p>
        </header>
        <main>
          <xsl:for-each select="/atom:feed/atom:entry">
            <article>
              <h2>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="atom:link/@href"/>
                  </xsl:attribute>
                  <xsl:value-of select="atom:title"/>
                </a>
              </h2>
              <p class="meta">
                Published: <xsl:value-of select="substring(atom:published, 1, 10)"/>
              </p>
              <div class="content">
                <xsl:value-of select="atom:summary"/>
              </div>
            </article>
          </xsl:for-each>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 