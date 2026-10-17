import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

BASE_URL = "https://rgs-interiors-carpenters.localo.site/"
PHOTOS_URL = "https://rgs-interiors-carpenters.localo.site/photos"
OUTPUT_DIR = "/Users/krantipa/Documents/RGS interiors/rgs-interiors/public/images"

def download_image(url, output_dir):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        parsed = urlparse(url)
        filename = os.path.basename(parsed.path)
        if not filename or filename.startswith('.'):
            # Try to get from url if it's dynamic, maybe just assign an id
            filename = url.split('/')[-1]
            if '?' in filename:
                filename = filename.split('?')[0]
            if not filename:
                filename = "img_" + str(hash(url)) + ".jpg"
                
        # Special case for localo site, the images might be in css or data-src
        
        filepath = os.path.join(output_dir, filename)
        if not os.path.exists(filepath):
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            print(f"Downloaded: {filename}")
        return filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def scrape_images():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    # Scrape index
    print(f"Scraping {BASE_URL}")
    response = requests.get(BASE_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    images = set()
    
    # Scrape img tags
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src:
            images.add(urljoin(BASE_URL, src))
            
    # Scrape style background images
    for tag in soup.find_all(style=True):
        style = tag['style']
        if 'background-image' in style or 'background' in style:
            # basic regex to extract url
            import re
            match = re.search(r'url\((.*?)\)', style)
            if match:
                url = match.group(1).strip("'\"")
                images.add(urljoin(BASE_URL, url))

    # Scrape photos page
    print(f"Scraping {PHOTOS_URL}")
    response = requests.get(PHOTOS_URL)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if src:
            images.add(urljoin(PHOTOS_URL, src))
            
    # And specifically look for gallery links/images
    for a in soup.find_all('a', href=True):
        href = a['href']
        if href.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            images.add(urljoin(PHOTOS_URL, href))
            
    for url in images:
        download_image(url, OUTPUT_DIR)
        
    print(f"Scraping complete. Found {len(images)} images.")

if __name__ == "__main__":
    scrape_images()
