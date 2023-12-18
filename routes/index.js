import UserController from "../app/Controllers/UserController.js";

const setupRoutes = (req, res) => {
  const userController = new UserController(req, res);

  if (req.url.startsWith("/users")) {
    if (req.url === "/users" && req.method === "GET") {
      userController.getUsers();
    } else if (req.url.match(/\/users\/\w+/) && req.method === "GET") {
      userController.getUser();
    } else if (req.url === "/users" && req.method === "POST") {
      userController.createUser();
    } else if (req.url.match(/\/users\/\w+/) && req.method === "PUT") {
      userController.updateUser();
    } else if (req.url.match(/\/users\/\w+/) && req.method === "DELETE") {
      userController.deleteUser();
    } else {
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

export default setupRoutes;
