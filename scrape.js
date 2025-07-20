const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 7 + i); // [7,8,...16]
const baseURL = "https://your-data-site.com/seed"; // <-- Replace with actual base URL

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `${baseURL}${seed}`;
    console.log(`Visiting ${url}`);
    await page.goto(url);
    
    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.textContent)).filter(n => !isNaN(n))
    );

    const localSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += localSum;

    console.log(`Sum for seed ${seed}:`, localSum);
  }

  console.log("🔢 TOTAL SUM OF ALL NUMBERS:", totalSum);
  await browser.close();
})();
