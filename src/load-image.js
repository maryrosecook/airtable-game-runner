function loadImage(url) {
  let image = new Image();
  image.src = url;

  return new Promise(resolve => (image.onload = () => resolve(image)));
}
