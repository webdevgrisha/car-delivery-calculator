/* eslint-disable new-cap */
import {onCall, CallableRequest} from "firebase-functions/v2/https";
// import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import {FirebaseError} from "firebase-admin";

// import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ProxyPlugin from "puppeteer-extra-plugin-proxy";
import iaaiParser from "./auctionParsers/iaaiParser";
import copartParser from "./auctionParsers/copartParser";

// const client = new SecretManagerServiceClient();
// const projectId = "liberty-cars-calculator";
// const secretName = "proxy";
// const versionId = "latest";

puppeteer.use(StealthPlugin());

export const getAuctionData = onCall(
  {
    region: "us-central1",
    memory: "2GiB",
    timeoutSeconds: 300,
  },
  async (
    request: CallableRequest<{ url: string }>
  ) => {
    try {
      const {url} = request.data;

      console.log("url: ", url);

      const hostName = (new URL(url)).hostname;

      const auction = hostName === "www.iaai.com" ? "iaai" : "copart";

      const isUrlValid = checkUrl(url, auction);

      if (!isUrlValid) {
        return {error: "invalid url"};
      }

      // const [version] = await client.accessSecretVersion({
      //   name: `projects/${projectId}/secrets/${secretName}/versions/` +
      //     `${versionId}`,
      // });

      // const proxyData: string | undefined =
      // version?.payload?.data?.toString();

      // if (!proxyData) {
      //   throw new Error("Proxy data is not set.");
      // }

      // const [address, port, username, password] = proxyData.split(",");

      // if (!address || !port || !username || !password) {
      //   throw new Error("Invalid proxy credentials.");
      // }

      // const proxyPlugin = ProxyPlugin({
      //   address,
      //   port: Number(port),
      //   credentials: {
      //     username,
      //     password,
      //   },
      // });

      // console.log({address, port, username, password});

      const waitUntil = auction === "iaai" ?
        "domcontentloaded" :
        "networkidle2";

      // puppeteer.use(proxyPlugin);

      let browser;
      try {
        browser = await puppeteer.launch({
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-background-timer-throttling",
            "--disable-renderer-backgrounding",
            "--disable-backgrounding-occluded-windows",
            "--disable-extensions",
            "--disable-component-extensions-with-background-pages",
            "--disable-infobars",
            // "--disable-popup-blocking",
            "--disable-sync",
            // "--disable-web-security",
            "--disable-site-isolation-trials",
            "--single-process",
            "--no-zygote",
            "--no-first-run",
            "--no-default-browser-check",
            "--mute-audio",
          ],
        });

        const page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on("request", (request) => {
          if (["stylesheet", "font", "media"]
            .includes(request.resourceType())) {
            request.abort();
          } else {
            request.continue();
          }
        });

        await page.goto(url, {waitUntil, timeout: 60000});

        const content = await page.content();

        const carInfo = auction === "iaai" ?
          iaaiParser(content) :
          copartParser(content);

        console.log("carInfo: ", carInfo);

        return {carInfo};
      } catch (error) {
        console.error("Error during Puppeteer operation:", error);
        return {error: "Error during Puppeteer operation:"};
      } finally {
        if (browser) {
          await browser.close();
        }
      }
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === "permission-denied") {
        return {error: "Access denied."};
      } else {
        return {error: "Failed get data: " + error.message};
      }
    }
  }
);


function checkUrl(url: string, auction: "copart" | "iaai") {
  const iaaiRegExp = /^https:\/\/www\.iaai\.com\/VehicleDetail\/\d{8}~US$/;
  const copartRegExp = /^https:\/\/www\.copart\.com\/lot\/\d{8}?$/;

  return auction === "iaai" ? iaaiRegExp.test(url) : copartRegExp.test(url);
}
