const pool = require("../config/database");

class Job {
  static async create(title, description, budget, location, category, user_id) {
    const query = `INSERT INTO jobs (title, description, budget, location, category, user_id) 
                   VALUES ($1, $2, $3, $4, $5, $6) 
                   RETURNING *`;
    const result = await pool.query(query, [title, description, budget, location, category, user_id]);
    return result.rows[0];
  }

  static async getAll() {
    const query = `SELECT j.*, u.name as posted_by, u.rating 
                   FROM jobs j 
                   JOIN users u ON j.user_id = u.id 
                   WHERE j.status = 'open' 
                   ORDER BY j.created_at DESC`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = `SELECT j.*, u.name as posted_by, u.rating, u.email 
                   FROM jobs j 
                   JOIN users u ON j.user_id = u.id 
                   WHERE j.id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getByUserId(user_id) {
    const query = `SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC`;
    const result = await pool.query(query, [user_id]);
    return result.rows;
  }

  static async update(id, updates) {
    const { title, description, budget, location, category, status } = updates;
    const query = `UPDATE jobs 
                   SET title = COALESCE($1, title), 
                       description = COALESCE($2, description), 
                       budget = COALESCE($3, budget), 
                       location = COALESCE($4, location), 
                       category = COALESCE($5, category), 
                       status = COALESCE($6, status), 
                       updated_at = CURRENT_TIMESTAMP 
                   WHERE id = $7 
                   RETURNING *`;
    const result = await pool.query(query, [title, description, budget, location, category, status, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = "DELETE FROM jobs WHERE id = $1";
    await pool.query(query, [id]);
  }
}

module.exports = Job;
