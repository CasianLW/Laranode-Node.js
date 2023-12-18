import http from "http";
import Router from "./bootstrap/Router.js";

const server = http.createServer();
new Router(server);

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
