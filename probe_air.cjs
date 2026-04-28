const https = require('https');

const candidates = [
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=5120&hei=2880&fmt=p-jpg",
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-202405-11inch-blue?wid=5120&hei=2880&fmt=p-jpg",
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202405-11inch-spacegray?wid=5120&hei=2880&fmt=p-jpg",
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202405-13inch-spacegray?wid=5120&hei=2880&fmt=p-jpg",
  "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-storage-select-202203-spacegray?wid=5120&hei=2880&fmt=p-jpg"
];

async function checkUrls() {
  for (const url of candidates) {
    try {
      const res = await new Promise((resolve, reject) => {
        https.get(url, (res) => {
          resolve(res.statusCode);
        }).on('error', reject);
      });
      console.log(`${res} - ${url.substring(0, 100)}...`);
    } catch (e) {
      console.log(`Error - ${url}`);
    }
  }
}

checkUrls();
