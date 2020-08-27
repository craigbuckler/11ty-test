// 11ty configuration
module.exports = config => {

  const
    dev = global.dev = (process.env.ELEVENTY_ENV === 'development'),
    pkg = require('./package.json'),
    meta = pkg.meta;

  meta.version = pkg.version;
  meta.now = new Date();


  /* --- PASS-THROUGH FILES --- */

  // images
  // using compression plugin now!
  // still required for favicon
  // config.addPassthroughCopy('./src/images/');


  /* --- PLUGINS --- */

  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation') );

  // RSS
  config.addPlugin( require('@11ty/eleventy-plugin-rss') );


  /* --- TRANSFORMS -- */

  // automatic image dimensions
  config.addTransform('imagesize', require('./lib/transforms/imagesize'));

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'));

  // inline assets
  config.addTransform('postcss', require('./lib/transforms/postcss'));

  // minify HTML
  config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));


  /* --- FILTERS --- */

  // minify HTML
  config.addFilter('htmlminify', require('./lib/transforms/htmlminify'));

  // format dates
  const dateformat = require('./lib/filters/dateformat');
  config.addFilter('dateformat', dateformat.friendly);
  config.addFilter('dateymd', dateformat.ymd);

  // format word count and reading time
  config.addFilter('readtime', require('./lib/filters/readtime'));


  /* --- SHORTCODES --- */

  // meta data
  config.addShortcode('meta', name => meta[name] || '');

  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist'));


  /* --- CUSTOM COLLECTIONS --- */

  // remove draft and future posts
  config.addCollection('post', collection =>

    collection
      .getFilteredByGlob('./src/writing/*.md')
      .filter(p => dev || (p.date <= meta.now && !p.data.draft))

  );


  // create list of all tags
  config.addCollection('taglist', collection => {

    let tagSet = new Set();

    collection.getAll().forEach(page =>

      (page.data.tags || [])
        .filter(tag => tag !== 'all' && tag !== 'undefined')
        .map(tag => tagSet.add(tag))

    );

    return [...tagSet].sort();

  });


  /* --- WATCH TARGETS --- */

  config.addWatchTarget('./src/css/');


  // 11ty defaults
  return {

    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: 'src',
      output: 'build'
    }

  };
};
