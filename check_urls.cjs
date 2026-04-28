const https = require('https');

const urls = {
  "ipad-pro-m4": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack?wid=5120&hei=2880&fmt=p-jpg",
  "ipad-air-m4": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-gallery-202405-11inch-spacegray?wid=5120&hei=2880&fmt=p-jpg",
  "ipad-10": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue?wid=5120&hei=2880&fmt=p-jpg",
  "airpods-4": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4-anc-select-202409?wid=5120&hei=2880&fmt=p-jpg",
  "airpods-pro-2": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg",
  "airpods-max": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=5120&hei=2880&fmt=p-jpg",
  "watch-se": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-se-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg",
  "watch-s10": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s10-digitalmat-gallery-1-202409?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-air-15": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-air-13": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-pro-14": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=5120&hei=2880&fmt=p-jpg",
  "charger-20w": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHJA3?wid=1144&hei=1144&fmt=jpeg"
};

async function checkUrls() {
  for (const [key, url] of Object.entries(urls)) {
    try {
      const res = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          resolve(res.statusCode);
        }).on('error', reject);
      });
      console.log(`${key}: ${res}`);
    } catch (e) {
      console.log(`${key}: Error`);
    }
  }
}

checkUrls();
