const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {

    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try {
        const page = await browser.newPage();

        await page.goto("https://www.google.com/");
        const logStatement = await page.$eval('div > div:nth-child(1) > a', h1 => h1.textContent);
        console.log(logStatement);
        res.send(logStatement);
    } catch (e) {
        console.error(e);
        res.send(`Something went wrong while running Puppeteer: ${e}`);
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeLogic };