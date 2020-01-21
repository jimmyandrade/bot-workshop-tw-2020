class ActionMediator {
  constructor(handlers) {
    this.handlers = handlers;
  }

  send({ action, ...parameters }) {
    const handler = this.handlers.find((h) => h.actionName === action);
    if (!handler) {
      throw new Error(`Could not find a handler for action '${action}'.`);
    }
    return handler.handle(parameters);
  }
}


module.exports = ActionMediator;
