# shinyokoe-carta

新横江地区のふるさとかるたのオープンデータと、GPSと連動してカードを集める位置情報ゲームです。

## デモ

- **[歩いてGET!新横江ふるさとかるた](https://code4fukui.github.io/shinyokoe-carta/map_game.html)**: 実世界のスポットを訪れてデジタルかるたカードを集める位置情報ゲーム。
- **[新横江ふるさとかるた一覧](https://code4fukui.github.io/shinyokoe-carta/)**: すべてのかるたカードを表示するインタラクティブなギャラリー（裏返しアニメーション付き）。
- **[新横江ふるさとかるた一覧マップ](https://code4fukui.github.io/shinyokoe-carta/map.html)**: すべてのかるたカードの位置を表示するマップ。
- **[ブログ記事（日本語）](https://fukuno.jig.jp/3305)**: プロジェクトを解説したブログ記事。

## 特徴

- **位置情報ベースのゲームプレイ**: Leaflet.jsとGeo3x3を使用してユーザーの位置を検出し、特定のスポットの一定半径内にいる場合にカードを「収集」できます。
- **自動化されたデータパイプライン**: オリジナルのかるたデータをPDFからウェブで利用可能な形式に処理する一連のスクリプト。
- **画像処理**: ソースPDFを自動的にPNGに変換し、個別のカード画像にトリミングするスクリプト。
- **オープンデータ**: テキスト、画像パス、位置情報を統合した最終データをCSVファイルとして提供。

## オープンデータ

- **[songs.csv](https://code4fukui.github.io/shinyokoe-carta/songs.csv)**: アプリケーションの主要なデータセット。以下の列を含みます:
  - `id`: カードのひらがな。
  - `song`: カードの読み札の全文。
  - `song_kana`: 読み札のふりがな（かな）。
  - `area`: カードで言及されている地域。
  - `image`: メインのカード画像（絵札）のパス。
  - `song_image`: 読み札のテキストが記載されたカード画像のパス。
  - `description_image`: 説明文が記載されたカード画像のパス。
  - `geo3x3`: カードのGeo3x3でエンコードされた位置情報。
- **[マップ画像](https://code4fukui.github.io/shinyokoe-carta/shinyokoe-carta-map.jpg)**: 新横江地区のカード位置を示す静的なマップ画像。

## データ生成ワークフロー

このリポジトリには、ソース資料から`songs.csv`データセットを構築するためのスクリプトが含まれています。

### 前提条件

- [Deno](https://deno.land/)
- [Python 3](https://www.python.org/)
- Pythonライブラリ `pdf2image` (`pip3 install pdf2image`)
- [Poppler](https://poppler.freedesktop.org/) (`pdf2image`の依存関係。例: macOSでは`brew install poppler`)

### 手順

最終データを生成するために、以下のスクリプトを順番に実行します:

1.  **`deno run --allow-net --allow-write download.js`**
    - 鯖江市公式ウェブサイトからオリジナルのかるたPDFファイルを`pdf/`ディレクトリにダウンロードします。

2.  **`python3 pdf2png.py`**
    - ダウンロードしたPDFの各ページをPNG画像に変換し、`img/`ディレクトリに保存します。

3.  **`deno run --allow-read --allow-write makeimgdata.js`**
    - 大きなPNGシートを個別のカード画像（絵札、読み札、説明札）にトリミングし、`data/`ディレクトリに保存します。

4.  **`deno run --allow-read --allow-write makedata.js`**
    - ベースとなるCSVファイル（`songs_txt.csv`、リポジトリには含まれません）を読み込み、生成された画像パスと結合して`songs_nopos.csv`を作成します。

5.  **`deno run --allow-read --allow-write geojson2csv.js`**
    - `songs_nopos.csv`と`poi.geojson`の地理座標をマージし、最終的な`songs.csv`を生成します。

### ユーティリティスクリプト

- **`deno run --allow-read --allow-write --allow-net tokana.js`**
  - [kanji2kana API](https://github.com/code4fukui/kanji2kana)を使用して読み札のふりがなを生成する補助スクリプト。

## ソース

オリジナルのかるたデータは、鯖江市新横江公民館から提供されています。

## ライセンス

MIT License
