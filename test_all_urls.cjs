const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('generate_accessories_sql.cjs', 'utf8');
const urls = [...content.matchAll(/https:\/\/store\.storeimages\.cdn-apple\.com\/[^']+/g)].map(m => m[0]);
const uniqueUrls = [...new Set(urls)];

async function checkUrls() {
  for (const url of uniqueUrls) {
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
