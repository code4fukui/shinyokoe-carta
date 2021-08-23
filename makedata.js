import { CSV } from "https://js.sabae.cc/CSV.js";

const fns = [];
for await (const f of Deno.readDir("data/")) {
  if (f.name == ".DS_Store") {
    continue;
  }
  fns.push(f.name);
}
fns.sort();
const basefns = fns.filter(f => f.endsWith("_0.jpg"));
console.log(basefns);

const songs = await CSV.fetch("./songs_txt.csv");
songs[0].push("image");
songs[0].push("song_image");
songs[0].push("description_image");
const baseurl = "data/";
for (let i = 1; i < songs.length; i++) {
  const s = songs[i];
  const fn = basefns[i - 1];
  s.push(baseurl + fn);
  s.push(baseurl + fn.substring(0, 4) + "1.jpg");
  s.push(baseurl + fn.substring(0, 4) + "2.jpg");
}
await Deno.writeTextFile("songs_nopos.csv", CSV.encode(songs));
