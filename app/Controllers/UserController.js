import UserRepository from "../Repository/UserRepository.js";
import UserValidator from "../Validator/UserValidator.js";
import bodyParser from "../Utils/BodyParser.js";

class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.userRepository = new UserRepository();
  }

  async getUsers() {
    try {
      const users = await this.userRepository.getAllUsers();
      if (!users) {
        this.res.writeHead(404, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ error: "Users not found" }));
        return;
      }
      this.res.writeHead(200, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify(users));
    } catch (error) {
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify({ error: "Internal Server Error" }));
    } finally {
      this.res.end();
    }
  }

  async getUser() {
    try {
      const userId = this.req.url.split("/")[2]; // Assuming URL format is /users/:id
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        this.res.writeHead(404, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ error: "User not found" }));
        return;
      }
      this.res.writeHead(200, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify(user));
    } catch (error) {
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.write(JSON.stringify({ error: "Internal Server Error" }));
    } finally {
      this.res.end();
    }
  }

  async createUser() {
    try {
      await bodyParser(this.req);
      const userData = this.req.body;
      const validation = UserValidator.validateCreate(userData);

      if (!validation.isValid) {
        this.res.writeHead(422, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ errors: validation.errors }));
        return;
      }

      const user = await this.userRepository.createUser(userData);
      this.res.writeHead(201, { "Content-Type": "application/json" });
      this.res.end(JSON.stringify(user));
    } catch (error) {
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }

  async updateUser() {
    try {
      const userId = this.req.url.split("/")[2];
      await bodyParser(this.req);
      const userData = this.req.body;

      const validation = UserValidator.validateUpdate(userData);
      if (!validation.isValid) {
        this.res.writeHead(422, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ errors: validation.errors }));
        return;
      }

      const updatedUser = await this.userRepository.updateUser(
        userId,
        userData
      );
      if (!updatedUser) {
        this.res.writeHead(404, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ error: "User not found" }));
        return;
      }

      this.res.writeHead(200, { "Content-Type": "application/json" });
      this.res.end(JSON.stringify(updatedUser));
    } catch (error) {
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }

  async deleteUser() {
    try {
      const userId = this.req.url.split("/")[2];
      const user = await this.userRepository.getUserById(userId);

      if (!user) {
        this.res.writeHead(404, { "Content-Type": "application/json" });
        this.res.end(JSON.stringify({ error: "User not found" }));
        return;
      }

      await this.userRepository.deleteUser(userId);
      this.res.writeHead(204);
      this.res.end();
    } catch (error) {
      this.res.writeHead(500, { "Content-Type": "application/json" });
      this.res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }
}

export default UserController;
