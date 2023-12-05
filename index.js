import dotenv from "dotenv";
import http from "http";
import setupRoutes from "./routes/index.js";

dotenv.config();

const server = http.createServer((req, res) => {
  setupRoutes({
    on: (path, handler) => {
      if (req.url === path) {
        handler(req, res);
      }
    },
  });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
