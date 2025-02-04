const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require('markdown-it-footnote');
const markdownItKatex = require('markdown-it-katex');
const { DateTime } = require("luxon");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const sass = require("sass");
const path = require("path");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  /**
   * Markdown Configuration
   * -------------------
   * Setup for markdown processing with anchor links and footnotes
   */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  })
  .use(markdownItAnchor, {
    slugify: (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    permalink: {
      symbol: "#",
      placement: "before",
      class: "direct-link"
    }
  })
  .use(markdownItFootnote)
  .use(markdownItKatex);

  // Set as the default markdown library
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Add markdown filter using the same library
  eleventyConfig.addFilter("markdown", function(content) {
    return markdownLibrary.render(content);
  });

  // Set server options
  eleventyConfig.setServerOptions({
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Show local network IP addresses for device testing
		showAllHosts: true,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",

		// Show the dev server version number on the command line
		showVersion: false,

		// Added in Dev Server 2.0+
		// The default file name to show when a directory is requested.
		indexFileName: "index.html",

		// Added in Dev Server 2.0+
		// An object mapping a URLPattern pathname to a callback function
		// for on-request processing (read more below).
		onRequest: {},
  });

  /**
   * Plugin Configuration
   * ------------------
   * Core plugins for syntax highlighting, navigation, and RSS feeds
   */
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Add TOC filter
  eleventyConfig.addFilter('toc', function(content) {
    const headings = content.match(/<h[2-6].*?id="(.*?)".*?>(.*?)<\/h[2-6]>/g) || [];
    if (headings.length === 0) return '';

    const toc = headings.map(heading => {
      const level = parseInt(heading.charAt(2)) - 2;
      const id = heading.match(/id="(.*?)"/)[1];
      const text = heading.match(/>(.*?)</)[1];
      return `<li style="margin-left: ${level * 1}rem"><a href="#${id}">${text}</a></li>`;
    }).join('\n');

    return `<ul class="toc-list">${toc}</ul>`;
  });

  // Add citation shortcode
  eleventyConfig.addShortcode("cite", function(key) {
    return `<a href="#ref-${key}" class="citation">[${key}]</a>`;
  });

  /**
   * Image Configuration
   * -----------------
   * Configuration for image processing and transformation
   */
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
	});
  /**
   * RSS Feed Configuration
   * --------------------
   * Setup for different content type feeds (main, articles, notes)
   */
  
  // Main feed - combines all content types
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: {
      name: "everything",
      limit: 20,
    },
    metadata: {
      language: "en",
      title: "Tanuj Ravi Rao - All Content",
      subtitle: "Latest blog posts and notes from Tanuj Ravi Rao",
      base: "https://tansanrao.com/",
      author: {
        name: "Tanuj Ravi Rao",
        email: "tanujrao99@gmail.com",
      }
    }
  });

  // Articles-specific feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/articles.xml",
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Tanuj Ravi Rao - Blog Posts",
      subtitle: "Latest blog posts from Tanuj Ravi Rao",
      base: "https://tansanrao.com/",
      author: {
        name: "Tanuj Ravi Rao",
        email: "tanujrao99@gmail.com",
      }
    }
  });

  // Notes-specific feed
  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/notes.xml",
    collection: {
      name: "notes",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Tanuj Ravi Rao - Notes",
      subtitle: "Latest notes and thoughts from Tanuj Ravi Rao",
      base: "https://tansanrao.com/",
      author: {
        name: "Tanuj Ravi Rao",
        email: "tanujrao99@gmail.com",
      }
    }
  });

  /**
   * Collections Configuration
   * ----------------------
   * Define and sort different content collections
   */
  
  // Combined collection of all content
  eleventyConfig.addCollection("everything", function(collectionApi) {
    return [...collectionApi.getFilteredByGlob("src/posts/*.md"), 
            ...collectionApi.getFilteredByGlob("src/notes/*.md")].sort((a, b) => b.date - a.date);
  });

  // Blog posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // Notes collection
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/notes/*.md");
  });

  // News collection
  eleventyConfig.addCollection("news", function(collection) {
    return collection.getFilteredByGlob("src/news/*.md");
  });

  // Filter function to remove specific tags from the tag list
  eleventyConfig.addFilter("filterTagList", tags => {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts", "notes"].indexOf(tag) === -1);
  });

  // Create tag pages for each tag
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).filter(tag => ["all", "nav", "post", "posts", "notes"].indexOf(tag) === -1);
  });

  /**
   * Date Formatting Filters
   * --------------------
   * Filters for consistent date formatting across the site
   */
  eleventyConfig.addFilter("dateToISO", (date) => {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addFilter("dateToReadable", (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMM dd, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  /**
   * Utility Filters and Shortcodes
   * ---------------------------
   * Helper functions for templates
   */
  eleventyConfig.addShortcode("buildTime", () => {
    return DateTime.now().toFormat("dd LLL yyyy");
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("slice", (array, start, end) => {
    return array.slice(start, end);
  });

  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  /**
   * SCSS Processing Configuration
   * --------------------------
   * Setup for SCSS compilation with error handling
   */
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addWatchTarget("src/scss/**/*.scss");
  
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      
      if(parsed.name.startsWith("_")) {
        return;
      }
      
      const scssOptions = {
        loadPaths: [
          parsed.dir || ".",
          path.join(parsed.dir, ".."),
          this.config.dir.includes
        ],
        style: "compressed",
        sourceMap: true
      };
      
      try {
        let result = sass.compile(inputPath, scssOptions);
        return async (data) => {
          // Get the output directory from the template data
          const outputDir = data.page.outputPath ? path.dirname(data.page.outputPath) : '_site';
          
          // Write the sourcemap file
          const sourcemapPath = path.join(outputDir, parsed.name + '.css.map');
          await require('fs').promises.mkdir(path.dirname(sourcemapPath), { recursive: true });
          await require('fs').promises.writeFile(
            sourcemapPath,
            JSON.stringify(result.sourceMap)
          );
          
          return result.css + `\n/*# sourceMappingURL=${parsed.name}.css.map */`;
        };
      } catch (err) {
        console.error('\x1b[31m%s\x1b[0m', '⚠️ SCSS Compilation Error:');
        console.error(err.message);
        console.error('\x1b[33m%s\x1b[0m', `File: ${inputPath}`);
        console.error('\x1b[33m%s\x1b[0m', `Line: ${err.line}, Column: ${err.column}`);
        
        if (process.env.NODE_ENV === 'production') {
          throw err;
        }
        return async () => '';
      }
    }
  });

  /**
   * Asset Management
   * --------------
   * Configuration for static assets and third-party resources
   */
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fontsource": "scss/@fontsource" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@fortawesome": "scss/@fortawesome" });
  eleventyConfig.addPassthroughCopy({ "node_modules/katex/dist/fonts": "assets/fonts/katex" });

  /**
   * Eleventy Configuration
   * -------------------
   * Core settings for directory structure and template processing
   */
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};