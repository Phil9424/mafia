const requireAll = require("require-all");

module.exports = function loadEventHandlers(dirname, emitter) {
  const eventHandlers = requireAll({ dirname });

  Object.entries(eventHandlers).forEach(([key, value]) =>
    Object.values(value)
      .map(handler => handler.bind(undefined, emitter))
      .forEach(handler => {
        emitter.on(key, handler);
      })
  );
};
