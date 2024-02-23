
//app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../client/dist/index.html')));

//app.use(express.static(path.join(__dirname, '../client/dist')));
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');

// DB client
//const client = new pg.Client("postgres://localhost/acme_notes_db");
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_notes_db')
//ROUTES
app.get("/api/notes", async (req, res, next) => {
  const SQL = `SELECT * FROM clients add --all
  WHERE txt IS null`;
  //request data from PG DB
  const response = await client.query(SQL);
  // send it to REACT
  res.send(response.rows)
});

const init = async () => {
  await client.connect();
  console.log("connected to server");

  const SQL = `
    DROP TABLE IF EXISTS clients;
    CREATE TABLE clients(id int PRIMARY KEY, name VARCHAR(40),designation VARCHAR(50));

    INSERT INTO id(number) VALUES(01, false);
    INSERT INTO name(txt, starred) VALUES('rocio', false);
    INSERT INTO designation (txt, starred) VALUES('admin');
    
    `
  console.log("seeded my DB");

  await client.query(SQL);

  app.listen(3000, () => {
    console.log("listening for requests");
  });
};

init();

