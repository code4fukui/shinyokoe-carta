import { CSV } from "https://js.sabae.cc/CSV.js";
import { kanji2kana } from "https://code4fukui.github.io/kanji2kana/kanji2kana.js";

//console.log(await kanji2kana("あ　秋空に　黄色がまぶし　銀杏並木　東鯖江"));
//Deno.exit(0);

const songs = await CSV.fetch("./songs_base.csv");
const kanas = [["id", "song", "song_kana", "area"]];
for (let i = 1; i < songs.length; i++) {
  const s = songs[i][0];
  const ss = s.split("　");
  if (ss.length != 5) {
    throw new Error(ss.length + " " + s);
  }
  const id = ss[0];
  const song = ss[1] + "　" + ss[2] + "　" + ss[3];
  const area = ss[4];
  console.log(ss.length);
  const kana = await kanji2kana(song);
  console.log(s, kana);
  kanas.push([id, song, kana, area]);
}
await Deno.writeTextFile("songs_with_kana_auto.csv", CSV.encode(kanas));
