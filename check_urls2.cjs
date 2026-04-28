const https = require('https');

const urls = {
  "ipad-air-m4-1": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-202405-11inch-spacegray?wid=5120&hei=2880&fmt=p-jpg",
  "ipad-air-m4-13": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-202405-13inch-spacegray?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-air-15-1": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202403?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-air-15-2": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-starlight-select-202306?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-air-15-3": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-pro-14-1": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-pro-14-2": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=5120&hei=2880&fmt=p-jpg",
  "macbook-pro-14-3": "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=5120&hei=2880&fmt=p-jpg"
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
