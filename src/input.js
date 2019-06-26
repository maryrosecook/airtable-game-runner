(function(exports) {
  let pressed = {};

  (function setup() {
    window.addEventListener("keydown", event => {
      const keyCode = event.keyCode;
      pressed[keyCode] = true;
    });

    window.addEventListener("keyup", event => {
      const keyCode = event.keyCode;
      pressed[keyCode] = false;
    });
  })();

  function isDown(keyCode) {
    return pressed[keyCode] === true;
  }

  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  exports.input = {
    update: async inputEntity => {
      await inputEntity.updateFields({
        "Left Arrow Down": isDown(LEFT_ARROW),
        "Right Arrow Down": isDown(RIGHT_ARROW)
      });
    }
  };
})(this);
