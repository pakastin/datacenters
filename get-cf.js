const puppeteer = require('puppeteer');
const { writeFile } = require('fs/promises');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.cloudflarestatus.com');

  const resultsSelector = '.name';
  await page.waitForSelector(resultsSelector);

  const results = await page.evaluate(resultsSelector => {
    const names = Array.from(document.querySelectorAll(resultsSelector));
    const results = {};
    for (const name of names) {
      const text = name.textContent.trim();
      if (text.includes('(') && text.includes(',') && text.includes('-')) {
        const city = text.split(',')[0];
        const country = text.split(', ')[1].split(' -')[0];
        const code = text.split('(')[1].split(')')[0];
        results[code] = { city, country };
      }
    }
    return results;
  }, resultsSelector);

  for (const code in results) {
    const result = results[code];
    const { city, country } = result;

    console.log(`${city}, ${country}`);

    const phrase = encodeURIComponent(`${city},${country}`);
    const url = `https://flyk.com/api/search/${phrase}`;
    const search = await fetch(url).then(res => res.json());
    const { lat, lon: lng } = search[0];

    result.lat = Number(lat);
    result.lng = Number(lng);
  }

  console.log(results);

  await browser.close();

  await writeFile('data/cf.json', JSON.stringify(results, false, 2), 'utf8');
})();
