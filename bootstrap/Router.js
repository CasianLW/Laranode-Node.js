import setupRoutes from "../routes/index.js";

class Router {
  constructor(server) {
    this.server = server;
    this.setupRoutes();
  }

  setupRoutes() {
    this.server.on("request", (req, res) => {
      setupRoutes(req, res);
    });
  }
}

export default Router;
