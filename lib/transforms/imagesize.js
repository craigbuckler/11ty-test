// adds width and height dimensions to an image
/*
improve: add to any where width is NOT set
*/
const
  imageSize = require('util').promisify( require('image-size') ),
  reImg = /<img[^>]*?dimensions[^>]*?>/gi,
  reSrc = /src=['|"]*(.+?)['|"|>|\s]/i;

module.exports = async(content, outputPath = '.html') => {

  if (!String(outputPath).endsWith('.html')) return content;

  const
    images = content.match(reImg),
    isize = images && await Promise.allSettled(

      images.map(img => {

        let src = img.match(reSrc);
        if (src && src.length === 2) {
          return imageSize('./src/' + src[1]);
        }
        return true;

      })

    );

  if (isize) {
    images.forEach((img, idx) => {

      const dim = isize[idx].value;
      if (dim) {

        let imgD = img.replace(/dimensions/i, `width="${ dim.width }" height="${ dim.height }"`);
        content = content.replace(img, imgD);

      }

    });
  }

  return content;

};
