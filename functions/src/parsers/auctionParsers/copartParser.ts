import * as cheerio from "cheerio";
import {AuctionData} from "./interfaces";

function copartParser(content: string) {
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
    auction: "copart",
  };

  carInfo.title = $(".title-and-highlights h1").text();

  carInfo.stock = $("#LotNumber").text().trim();

  carInfo.odometer = $("span[data-uname=\"lotdetailOdometervalue\"]")
    .text()
    .trim();

  carInfo.engine = $("span[data-uname=\"lotdetailEnginetype\"]").text().trim();

  carInfo.fuelType = $("span[data-uname=\"lotdetailFuelvalue\"]").text().trim();

  carInfo.primaryDamage = $("span[data-uname=\"lotdetailPrimarydamagevalue\"]")
    .text()
    .trim();

  carInfo.transmission = $("label:contains(\"Transmission:\")")
    .parent()
    .find("span")
    .eq(0)
    .text()
    .trim();

  carInfo.keys = $("span[data-uname=\"lotdetailKeyvalue\"]").text().trim();

  carInfo.location = $(
    "a[data-uname=\"lotdetailSaleinformationlocationvalue\"]"
  )
    .text()
    .trim();

  const images: string[] = [];
  $("#small-img-roll img")
    .slice(0, 4)
    .each((_, el) => {
      const imgSrc = $(el).attr("src");

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

export default copartParser;
