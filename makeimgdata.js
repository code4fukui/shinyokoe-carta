import { PNG } from "https://taisukef.github.io/PNG/PNG.js";

const names = [
  'karutaagyou',
  'karutakagyou',
  'karutasagyou',
  'karutatagyou',
  'karutanagyou',
  'karutahagyou',
  'karutamagyou',
  'karutayagyou',
  'karutaragyou',
  'karutawagyou',
];

const fetchBin = async (fn) => {
  return new Uint8Array(await Deno.readFile(fn));
};

class ImageUtil {
  static crop(img, x, y, w, h) {
    const dst = new Uint8ClampedArray(w * 4 * h);
    const src = img.data;
    const sw = img.width;
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w * 4; j++) {
        dst[i * w * 4 + j] = src[(i + y) * sw * 4 + j + x * 4];
      }
    }
    return { data: dst, width: w, height: h };
  }
}

let cnt = 0;
for (const name of names) {
  for (let i = 1; i <= 5; i++) {
    try {
      const fn = "img/" + name + "_0" + i + ".png";
      console.log(fn);
      const img = await PNG.decode(await fetchBin(fn));
      //console.log(img);
      
      const img2 = ImageUtil.crop(img, 798, 64, 870, 1360);
      const dst = await PNG.encode(img2);
      await Deno.writeFile("data/" + cnt + "_" + i + "_" + 0 + ".png", dst);
      
      const img3 = ImageUtil.crop(img, 1753, 64, 870, 1360);
      const dst2 = await PNG.encode(img3);
      await Deno.writeFile("data/" + cnt + "_" + i + "_" + 1 + ".png", dst2);

      const img4 = ImageUtil.crop(img, 24, 28, 738, 1448);
      const dst4 = await PNG.encode(img4);
      await Deno.writeFile("data/" + cnt + "_" + i + "_" + 2 + ".png", dst4);
    } catch (e) {
      console.log("nocard", cnt, i);
    }
  }
  cnt++;
}
