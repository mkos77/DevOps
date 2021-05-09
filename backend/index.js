const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const redis = require("redis");
const redisClient = redis.createClient({
  host: "myredis",
  port: 6379,
  // retry_strategy: () => 1000
});

redisClient.on("connect", () => {
  console.log("REDIS CONNECTED!");
});

const { Pool } = require("pg");
const pgClient = new Pool({
  user: "postgres",
  password: "1qaz2wsx",
  database: "postgres",
  host: "mypostgres",
  port: "5432",
});

pgClient.on("error", () => {
  console.log("Nie udało się połączyć z baza danych");
});

pgClient
  .query(
    `CREATE TABLE IF NOT EXISTS movies (id SERIAL PRIMARY KEY, name TEXT);`
  )
  .catch((err) => {
    console.log(err);
  });

// pgClient.query(`INSERT INTO movies (name) VALUES ('TEST NAME');`).
// catch((err) => {console.log(err)});

const PORT = 4000;

app.get("api/", (req, res) => {
  res.send("Hello World!");
});

app.get("/movie", (req, res) => {
  pgClient.query(`SELECT * FROM movies;`, (err, postgres) => {
    if (err) {
      console.log(err.stack);
    } else {
      const data = postgres.rows;
      res.send(data);
    }
  });
});

app.get("api/movie/:id", (req, res) => {
  const id = req.params.id;
  redisClient.exists(id, (err, redis) => {
    if (redis == 1) {
      redisClient.get(id, (err, redis) => {
        if (err) {
          console.log(err.stack);
        } else {
          const data = redis;
          console.log("Odpowiedź - Redis");
          res.send(data);
        }
      });
    } else {
      pgClient.query(
        `SELECT * FROM movies WHERE id='${id}';`,
        (err, postgres) => {
          if (err) {
            console.log(err.stack);
          } else {
            const data = postgres.rows[0];
            console.log("Odpowiedź - Postgres");
            res.send(data);
          }
        }
      );
    }
  });
});

app.post("api/movie", function (req, res) {
  const { name } = req.body;
  pgClient.query(
    `INSERT INTO movies (name) VALUES ('${name}') RETURNING id`,
    (error, result) => {
      if (error) {
        throw error;
      }
      const id = result.rows[0].id;
      redisClient.set(id, name);
      console.log(`Dodano film o ID  - ` + id);
      res.send("Dodano film w Postgres i Redis");
    }
  );
});

app.delete("api/movie/:id", (req, res) => {
  const id = request.params.id;

  redisClient.exists(id, (err, redis) => {
      if (redis == 1) {
          redisClient.del(`${id}`);
      }
  });

  pgClient.query(`DELETE FROM movies WHERE id = '${id}';`);
  res.send("Usunięto film w Postgres i Redis");
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
