const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "126262",
    host: "localhost",
    port: 5432,
    database: "StudentSystem"
});

module.exports = pool;