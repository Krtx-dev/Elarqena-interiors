const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = "https://rgs-interiors-carpenters.localo.site/";
const PHOTOS_URL = "https://rgs-interiors-carpenters.localo.site/photos";
const OUTPUT_DIR = path.join(__dirname, 'rgs-interiors/public/images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    let client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadImage(res.headers.location));
      }
      if (res.statusCode !== 200) {
        resolve(false);
        return;
      }
      
      let filename = `img_${Math.floor(Math.random() * 1000000)}.jpg`;
      
      const filePath = path.join(OUTPUT_DIR, filename);

      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${filename}`);
        resolve(true);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        resolve(false);
      });
    }).on('error', (err) => {
      resolve(false);
    });
  });
}

async function scrapeUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function run() {
  try {
    const urlsToScrape = [BASE_URL, PHOTOS_URL];
    const imageUrls = new Set();
    
    for (const url of urlsToScrape) {
      console.log(`Scraping ${url}`);
      const html = await scrapeUrl(url);
      
      // Look for src="..."
      const srcRegex = /src=["'](.*?)["']/gi;
      let match;
      while ((match = srcRegex.exec(html)) !== null) {
        const u = match[1];
        if (u.includes('googleusercontent.com') || u.match(/\.(jpg|jpeg|png|webp)/i)) {
           imageUrls.add(u.replace(/&amp;/g, '&'));
        }
      }
      
      // Look for data-original-url
      const dataUrlRegex = /data-original-url=["'](.*?)["']/gi;
      while ((match = dataUrlRegex.exec(html)) !== null) {
        imageUrls.add(match[1].replace(/&amp;/g, '&'));
      }
      
      // Look for data-srcset or srcset and split by space
      const srcsetRegex = /srcset=["'](.*?)["']/gi;
      while ((match = srcsetRegex.exec(html)) !== null) {
        const parts = match[1].split(',');
        for (const p of parts) {
            const u = p.trim().split(' ')[0];
            if (u.includes('googleusercontent.com') || u.match(/\.(jpg|jpeg|png|webp)/i)) {
               imageUrls.add(u.replace(/&amp;/g, '&'));
            }
        }
      }
    }
    
    // Process URLs
    const finalUrls = Array.from(imageUrls).map(url => {
      if (url.startsWith('http')) return url;
      if (url.startsWith('//')) return 'https:' + url;
      if (url.startsWith('/')) return BASE_URL + url.substring(1);
      return BASE_URL + url;
    });
    
    console.log(`Found ${finalUrls.length} images.`);
    
    for (let i = 0; i < finalUrls.length; i++) {
      await downloadImage(finalUrls[i]);
    }
    
    console.log("Done");
  } catch(e) {
    console.error(e);
  }
}

run();
