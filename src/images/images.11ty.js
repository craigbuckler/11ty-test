// image minification
const
  imagemin = require('imagemin'),
  plugins = [
    require('imagemin-mozjpeg')(),
    require('imagemin-pngquant')({ strip: true }),
    require('imagemin-svgo')()
  ];

module.exports = class {

  data() {

    return {
      permalink: false,
      eleventyExcludeFromCollections: true
    };

  }

  // process all files
  async render() {

    await imagemin(['src/images/**/*', '!src/images/**/*.js'], {
      destination: 'build/images',
      plugins
    });

    return true;

  }
};
