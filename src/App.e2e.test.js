import { internet } from "faker";
const puppeteer = require("puppeteer");

const user = {
  username: internet.userName(),
};

const isDebugging = () => {
  const debugging = {
    headless: false,
    slowMo: 50,
    devtools: true,
  };
  return process.env.NODE_ENV === "debug" ? debugging : {};
};

let browser;
let page;

describe("on page load", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch(isDebugging());
    page = await browser.newPage();
    await page.goto("http://localhost:11030/");
    await page.waitForSelector("main");
  }, 90000); // This hook has a long timeout, so that services have time to start

  afterAll(() => {
    if (isDebugging()) {
      browser.close();
    }
  });

  it("renders lobby", async () => {
    expect.hasAssertions();
    const title = await page.title();

    expect(title).toBe("Lobby | octoboard");
  });

  it("has a working login flow", async () => {
    expect.hasAssertions();

    await page.click('a.button[href="/login/guest"]');
    await page.waitForSelector(".ui.modal");
    expect(await page.url()).toMatch("/login/guest");

    await page.type('.ui.modal form input[type="text"]', user.username);
    await page.click(".ui.modal form button");

    await page.waitForSelector(".ui.modal", { hidden: true });
    await page.waitForSelector(".ui.form input[type='checkbox']");

    expect(await page.url()).not.toMatch("/login/guest");
    const userMenu = await page.$eval("nav .ui.right", (e) => e.innerHTML);
    expect(userMenu).toMatch(user.username);
  });
});
