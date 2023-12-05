import dotenv from "dotenv";
import http from "http";

dotenv.config();

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(JSON.stringify({ message: "Hello World!" })));
  res.end();
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
