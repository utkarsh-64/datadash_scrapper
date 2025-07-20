const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 7 + i); // seeds 7 to 16
const baseURL = "https://sanand0.github.io/tdsdata/js_table/?seed=";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `${baseURL}${seed}`;
    console.log(`🔗 Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Extract and sum all numbers from <td> elements in any table
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );

    const localSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += localSum;
    console.log(`✅ Seed ${seed}: sum = ${localSum}`);
  }

  console.log("🔢 TOTAL SUM OF ALL NUMBERS:", totalSum);
  await browser.close();
})();
