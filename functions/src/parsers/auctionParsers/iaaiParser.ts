import * as cheerio from "cheerio";
import {AuctionData} from "./interfaces";

function iaaiParser(content: string) {
  const $ = cheerio.load(content);

  const carInfo: AuctionData = {
    title: "",
    imgs: [],
    stock: "",
    odometer: "",
    engine: "",
    fuelType: "",
    primaryDamage: "",
    transmission: "",
    keys: "",
    location: "",
    auction: "iaai",
  };

  carInfo.title = $(".vehicle-header h1").text();

  carInfo.stock = $(".data-list.data-list--details span:contains(\"Stock #:\")")
    .parent()
    .find("span")
    .eq(1)
    .text();

  carInfo.odometer = $(
    ".data-list.data-list--details span:contains(\"Odometer:\")"
  )
    .parent()
    .find("span")
    .eq(1)
    .text();

  carInfo.engine = $(".data-list.data-list--details span:contains(\"Engine:\")")
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  carInfo.fuelType = $(
    ".data-list.data-list--details span:contains(\"Fuel Type:\")"
  )
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  carInfo.primaryDamage = $(
    ".data-list.data-list--details span:contains(\"Primary Damage:\")"
  )
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  carInfo.transmission = $(
    ".data-list.data-list--details span:contains(\"Transmission:\")"
  )
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  carInfo.keys = $(".data-list.data-list--details span:contains(\"Key:\")")
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  carInfo.location = $(
    ".data-list.data-list--details span:contains(\"Selling Branch:\")"
  )
    .parent()
    .find("span")
    .eq(1)
    .text()
    .trim();

  const images: string[] = [];
  $("#spacedthumbs1strow img")
    .slice(0, 4)
    .each((_, el) => {
      const imgSrc = $(el).attr("src"); // Извлекаем URL изображения

      if (imgSrc) {
        const updatedUrl = imgSrc
          .replace(/width=\d+/, "width=500")
          .replace(/height=\d+/, "height=500");

        images.push(updatedUrl);
      }
    });

  carInfo.imgs = images;

  return carInfo;
}

export default iaaiParser;
