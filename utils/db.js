const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: "localhost",
  user: "root",
  database: "megak_santa",
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
