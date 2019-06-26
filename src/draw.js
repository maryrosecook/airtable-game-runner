(function(exports) {
  function getScreen() {
    return document.querySelector("#screen").getContext("2d");
  }

  async function loadImages(records) {
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      if (hasImages(record)) {
        record.images = await Promise.all(
          record.fields.Images.map(image => image.url).map(loadImage)
        );
      }
    }
  }

  function hasImages(record) {
    return record.fields.Images !== undefined;
  }

  function currentImage(record) {
    return record.images[record.fields["Current Image"]];
  }

  function update(records) {
    let screen = getScreen();

    screen.clearRect(0, 0, screen.canvas.width, screen.canvas.height);

    records
      .filter(hasImages)
      .forEach(record =>
        screen.drawImage(currentImage(record), record.fields.X, record.fields.Y)
      );
  }

  exports.draw = { update, loadImages };
})(this);
