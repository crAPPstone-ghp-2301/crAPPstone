'use strict'
const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');
const { promisify } = require('util');
const { db, models: { User, Restroom, Ratings, Review, Comments } } = require('../server/db');

const filePath = path.join(__dirname, 'Restroom-in-Hotel-NYC.csv');
const csvFilePath = './script/Restroom-in-Hotel-NYC.csv';

if (!fs.existsSync(csvFilePath)) {
  console.error(`File not found: ${path.resolve(csvFilePath)}`);
}


async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      id: 1,
      username: 'john_doe',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      isAdmin: true,
      lastLogin: new Date('2022-01-01T10:00:00.000Z')
    }),
    User.create({
      id: 2,
      username: 'jane_smith',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password456',
      isAdmin: false,
      lastLogin: new Date('2022-01-02T10:00:00.000Z')
    }),
    User.create({
      id: 3,
      username: 'bob_johnson',
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      password: 'password789',
      isAdmin: false,
      lastLogin: new Date('2022-01-03T10:00:00.000Z')
    }),
    User.create({
      id: 4,
      username: 'kate_wilson',
      name: 'Kate Wilson',
      email: 'katewilson@example.com',
      password: 'password123',
      isAdmin: false,
      lastLogin: new Date('2022-01-04T10:00:00.000Z')
    }),
    User.create({
      id: 5,
      username: 'alex_miller',
      name: 'Alex Miller',
      email: 'alexmiller@example.com',
      password: 'password456',
      isAdmin: true,
      lastLogin: new Date('2022-01-05T10:00:00.000Z')
    })
  ])


//creating restrooms arrray from csv
const restrooms = await csv().fromFile(csvFilePath);

    const restroomPromises = restrooms.map(restroom => {
      return Restroom.create(restroom);
    });

    
    try {
      await Promise.all([
        ...restroomPromises,
      ]);
    
      console.log('Data successfully inserted.');
    
    } catch (error) {
      console.error('Error inserting data:', error);
    }
    
    await db.close();
    

    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${restrooms.length} restrooms`)
    console.log(`seeded ${comments.length} comments`)
    console.log(`seeded ${reviews.length} reviews`)
    // console.log(`seeded ${ratings.length} ratings`)
    console.log(`seeded successfully`)
  }

  async function runSeed() {
    console.log("seeding...");
    try {
      await seed();
      console.log("closing db connection");
      // await db.close();
      console.log("db connection closed");
    } catch (err) {
      console.error(err);
      process.exitCode = 1;
    }
  }


  if (module === require.main) {
    runSeed()
  }

  // we export the seed function for testing purposes (see `./seed.spec.js`)
  module.exports = seed
