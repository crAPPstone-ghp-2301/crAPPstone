const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crAPP',
  password: '123',
  port: 5432,
});

const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const csvFilePath = path.join(__dirname, 'Restroom-in-Hotel-NYC.csv');
const readStream = fs.createReadStream(csvFilePath);
let csvData = [];

const csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', function () {
    csvData.shift(); // remove header row
    const query = `
      COPY crAPP FROM STDIN WITH (FORMAT csv, HEADER true)
    `;
    pool.query(query, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Inserted ${csvData.length} rows`);
      }
      pool.end();
    });
  });

readStream.pipe(csvStream);
