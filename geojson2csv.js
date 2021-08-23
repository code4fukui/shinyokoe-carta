import { CSV } from "https://js.sabae.cc/CSV.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";

const geojson2poi = (json) => {
  const data = json.features.filter(f => f.type == "Feature" && f.geometry.type == "Point").map(f => {
    const c = f.geometry.coordinates;
    console.log(c[1], c[0]);
    return {
      name: f.properties.name,
      geo3x3: Geo3x3.encode(c[1], c[0], 14),
    }
  });
  return data;
};

//export { geojson2csv };

const json = JSON.parse(await Deno.readTextFile("./poi.geojson"));
const data = geojson2poi(json);
data.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));

const songs = CSV.toJSON(await CSV.fetch("./songs_nopos.csv"));
data.forEach(d => {
  const song = songs.find(s => s.id == d.name);
  d.image = song.image;
  d.song = song.song;
});

songs.forEach(s => {
  const d = data.find(d => d.name == s.id);
  if (!d) {
    throw new Error("can't find: " + d.id);
  }
  s.geo3x3 = d.geo3x3;
});
console.log(songs);
await Deno.writeTextFile("./songs.csv", CSV.encode(CSV.fromJSON(songs)));
