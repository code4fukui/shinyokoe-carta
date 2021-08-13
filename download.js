import HTMLParser from "https://dev.jspm.io/node-html-parser";
import { fetchTextCurl, fetchCurl } from "https://js.sabae.cc/fetchCurl.js";

const url = "https://www.city.sabae.fukui.jp/kosodate_kyoiku/shogaigakushu/shinyokoekominkan/CCShinyokoekarut.html";
const baseurl = "https://www.city.sabae.fukui.jp/kosodate_kyoiku/shogaigakushu/shinyokoekominkan/";
const html = await fetchTextCurl(url);
const root = HTMLParser.parse(html);
const pdfs = root.querySelectorAll("a").filter(a => a.attributes.href).filter(a => a.attributes.href.endsWith(".pdf")).map(a => baseurl + a.attributes.href);
console.log(pdfs);
for (const pdf of pdfs) {
  const bin = await fetchCurl(pdf);
  const fn = pdf.substring(pdf.lastIndexOf("/") + 1);
  await Deno.writeFile("pdf/" + fn, bin);
  console.log(fn, bin.length);
}
