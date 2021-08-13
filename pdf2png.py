# brew install poppler
# pip3 install pdf2image

from pdf2image import convert_from_path

names = [
  'karutaagyou',
  'karutahagyou',
  'karutakagyou',
  'karutamagyou',
  'karutanagyou',
  'karutaragyou',
  'karutasagyou',
  'karutatagyou',
  'karutawagyou',
  'karutayagyou',
]

for name in names:
  images = convert_from_path('pdf/' + name + '.pdf')

  for i, page in enumerate(images):
    file_name = name + "_{:02d}".format(i + 1) + ".png"
    image_path = "img/" + file_name
    page.save(image_path, "PNG")
