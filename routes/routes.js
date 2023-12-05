import UserController from "../app/Controllers/UserController.js";

const setupRoutes = (app) => {
  app.on("/users", (req, res) => {
    const userController = new UserController(req, res);
    userController.getUsers(); // Assuming getUsers is a method in UserController
  });

  // Add other routes here
};

export default setupRoutes;
