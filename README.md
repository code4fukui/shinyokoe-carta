# shinyokoe-carta

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

新横江地区のふるさとかるたのオープンデータと、GPSと連動してカードを集める位置情報ゲームです。

This project provides open data for the Shinyokoe Furusato Karuta (hometown card game) and includes a location-based game where you can "collect" cards using your device's GPS.

## Demos

- **[歩いてGET!新横江ふるさとかるた](https://code4fukui.github.io/shinyokoe-carta/map_game.html)**: A location-based game where you visit real-world spots to collect digital *karuta* cards.
- **[新横江ふるさとかるた一覧](https://code4fukui.github.io/shinyokoe-carta/)**: An interactive gallery of all the *karuta* cards with a flip animation.
- **[新横江ふるさとかるた一覧マップ](https://code4fukui.github.io/shinyokoe-carta/map.html)**: A map showing the locations of all the *karuta* cards.
- **[Blog Post (Japanese)](https://fukuno.jig.jp/3305)**: A blog post explaining the project.

## Features

- **Location-Based Gameplay**: Uses Leaflet.js and Geo3x3 to detect the user's location, allowing them to "collect" cards when they are within a certain radius of a point of interest.
- **Automated Data Pipeline**: A series of scripts to process the original *karuta* data from PDF to a usable web format.
- **Image Processing**: Scripts automatically convert source PDFs to PNGs and then crop them into individual card images.
- **Open Data**: The final, consolidated data is provided as a CSV file, combining text, image paths, and geolocations.

## Open Data

- **[songs.csv](https://code4fukui.github.io/shinyokoe-carta/songs.csv)**: The primary dataset for the applications, containing the following columns:
  - `id`: The hiragana character for the card.
  - `song`: The full text of the poem on the card.
  - `song_kana`: Phonetic (kana) reading of the poem.
  - `area`: The local area mentioned on the card.
  - `image`: Path to the main card image (the "picture" side).
  - `song_image`: Path to the card image with the poem text.
  - `description_image`: Path to the card image with the description.
  - `geo3x3`: The Geo3x3 encoded location for the card.
- **[Map Image](https://code4fukui.github.io/shinyokoe-carta/shinyokoe-carta-map.jpg)**: A static map image of the Shinyokoe area showing card locations.

## Data Generation Workflow

This repository contains scripts to build the `songs.csv` dataset from source materials.

### Prerequisites

- [Deno](https://deno.land/)
- [Python 3](https://www.python.org/)
- Python library `pdf2image` (`pip3 install pdf2image`)
- [Poppler](https://poppler.freedesktop.org/) (a dependency for `pdf2image`, e.g., `brew install poppler` on macOS)

### Steps

The following scripts are run in order to generate the final data:

1.  **`deno run --allow-net --allow-write download.js`**
    - Downloads the original *karuta* PDF files from the Sabae City official website into the `pdf/` directory.

2.  **`python3 pdf2png.py`**
    - Converts each page of the downloaded PDFs into PNG images, saving them to the `img/` directory.

3.  **`deno run --allow-read --allow-write makeimgdata.js`**
    - Crops the large PNG sheets into individual card images (picture, poem, and description) and saves them to the `data/` directory.

4.  **`deno run --allow-read --allow-write makedata.js`**
    - Reads a base CSV file (`songs_txt.csv`, not included) and combines it with the generated image paths to create `songs_nopos.csv`.

5.  **`deno run --allow-read --allow-write geojson2csv.js`**
    - Merges `songs_nopos.csv` with geographic coordinates from `poi.geojson` to produce the final `songs.csv`.

### Utility Scripts

- **`deno run --allow-read --allow-write --allow-net tokana.js`**
  - An auxiliary script that uses the [kanji2kana API](https://github.com/code4fukui/kanji2kana) to generate phonetic readings for the poems.

## Source

The original *karuta* data is provided by the Shinyokoe Community Center, Sabae City.

## License

MIT License