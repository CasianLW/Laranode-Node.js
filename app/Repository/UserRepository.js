// app/Repository/UserRepository.js
import pool from "../../bootstrap/Db.js";
import User from "../Models/User.js";

class UserRepository {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows.map(
      (row) =>
        new User(
          row.id,
          row.name,
          row.email,
          row.created_at,
          row.updated_at,
          row.password
        )
    );
  }

  async getUserById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows.length
      ? new User(
          result.rows[0].id,
          result.rows[0].name,
          result.rows[0].email,
          result.rows[0].created_at,
          result.rows[0].updated_at,
          result.rows[0].password
        )
      : null;
  }

  async createUser(userData) {
    const { name, email, password, created_at, updated_at } = userData;
    const result = await pool.query(
      "INSERT INTO users (name, email, password, created_at, updated_at ) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, created_at, updated_at]
    );
    return new User(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].email,
      result.rows[0].created_at,
      result.rows[0].updated_at,
      result.rows[0].password
    );
  }

  async updateUser(id, userData) {
    const { name, email, password, created_at, updated_at } = userData;
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3, created_at = $4, updated_at = $5 WHERE id = $6 RETURNING *",
      [name, email, password, created_at, updated_at, id]
    );
    return result.rows.length
      ? new User(
          result.rows[0].id,
          result.rows[0].name,
          result.rows[0].email,
          result.rows[0].created_at,
          result.rows[0].updated_at,
          result.rows[0].password
        )
      : null;
  }

  async deleteUser(id) {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  }
}

export default UserRepository;
