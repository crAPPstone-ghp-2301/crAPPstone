'use strict'
const fs = require('fs');
const parse = require('csv-parse');

const path = require('path');

const filePath = path.join(__dirname, 'Restroom-in-Hotel-NYC.csv');
const csvFilePath = './script/Restroom-in-Hotel-NYC.csv';
if (!fs.existsSync(csvFilePath)) {
  console.error(`File not found: ${path.resolve(csvFilePath)}`);
  process.exit(1);
}

const { db, models: { User, Restroom, Ratings, Review, Comments } } = require('../server/db')

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

fs.readFile('./script/Restroom-in-Hotel-NYC.csv', 'utf-8', async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const rows = data.split('\n');

  // Loop through each row and split it into an array of values
  const restrooms = rows.map(row => {
    const values = row.split(',');

    // Return an object with the values mapped to keys
    return {
      name: values[0],
      location: values[1],
      city: values[2],
      latitude: values[3],
      longitude: values[4]
    };
  });

  // console.log('Restrooms:', restrooms);

  // Create Restroom objects from the data and save them to the database
  await Promise.all(restrooms.map(restroom => {
    return Restroom.create(restroom);
  }));

  console.log('Restrooms added to the database');
});

  //creating ratings
  const ratings = [
    {
      id: 1,
      restroomId: 1,
      userId: 1,
      userRating: 4.5,
      isClean: true,
      // userRatingsTotal: 20,
    },
    {
      id: 2,
      restroomId: 2,
      userId: 2,
      userRating: 3.2,
      isClean: false,
      // userRatingsTotal: 10,
    },
    {
      id: 3,
      restroomId: 3,
      userId: 3,
      userRating: 4.0,
      isClean: true,
      // userRatingsTotal: 15,
    },
    {
      id: 4,
      restroomId: 4,
      userId: 4,
      userRating: 2.5,
      isClean: false,
      // userRatingsTotal: 8,
    },
    {
      id: 5,
      restroomId: 5,
      userId: 5,
      userRating: 5.0,
      isClean: true,
      // userRatingsTotal: 30,
    }
  ]
  //creating reviews
  const reviews = [
    {
      id: 1,
      restroomId: 1,
      userId: 1,
      imageURL: "https://example.com/image1.png",
      reviewText: "This is a great restroom!",
      // reportStatus: false,
      created_at: "2022-04-20 12:00:00",
      commentId: 1,
    },
    {
      id: 2,
      restroomId: 2,
      userId: 2,
      imageURL: "https://example.com/image2.png",
      reviewText: "This restroom is not very clean.",
      // reportStatus: true,
      createdAt: "2022-05-01 10:30:00",
      commentId: 2,
    },
    {
      id: 3,
      restroomId: 3,
      userId: 3,
      imageURL: null,
      reviewText: "This is an average restroom.",
      // reportStatus: true,
      createdAt: "2022-05-02 15:20:00",
      commentId: 3,
    },
    {
      id: 4,
      restroomId: 4,
      userId: 4,
      imageURL: "https://example.com/image4.png",
      reviewText: "This restroom is in bad condition.",
      // reportStatus: false,
      createdAt: "2022-05-03 18:40:00",
      commentId: 4,
    },
    {
      id: 5,
      restroomId: 5,
      userId: 5,
      imageURL: null,
      reviewText: "This is the best restroom ever!",
      // reportStatus: true,
      createdAt: "2022-05-03 23:10:00",
      commentId: 5,
    }
  ]
  //creating comments
  const comments = [
    {
      id: 1,
      parentCommentId: null,
      userId: 1,
      reviewId: 1,
      content: 'Great review, thanks for sharing!',
      createdAt: '2022-05-01 10:30:00',
      likes: 3
    },
    {
      id: 2,
      parentCommentId: null,
      userId: 3,
      reviewId: 1,
      content: 'I completely agree with your review, it was a great experience!',
      createdAt: '2022-05-01 12:15:00',
      likes: 5
    },
    {
      id: 3,
      parentCommentId: null,
      userId: 2,
      reviewId: 2,
      content: 'Thanks for sharing this review, I found it really helpful!',
      createdAt: '2022-05-02 08:45:00',
      likes: 2
    },
    {
      id: 4,
      parentCommentId: 1,
      userId: 4,
      reviewId: null,
      content: 'I second that, great review!',
      createdAt: '2022-05-03 14:10:00',
      likes: 1
    },
    {
      id: 5,
      parentCommentId: null,
      userId: 1,
      reviewId: 3,
      content: 'Thank you for your review, I had a great time at this location as well!',
      createdAt: '2022-05-04 11:20:00',
      likes: 0
    }
    //Note that the parent_comment_id is null for top-level comments, but for replies, it contains the ID of the parent comment.
  ]

  // await Promise.all(restrooms.map(restroom => {
  //   return Restroom.create(restroom);
  // }));
  await Promise.all(ratings.map(rating => {
    return Ratings.create(rating);
  }));
  await Promise.all(reviews.map(review => {
    return Review.create(review);
  }));
  const parentComments = comments.filter(comment => {
    return comment.parentCommentId === null;
  });
  const childComments = comments.filter(comment => {
    return comment.parentCommentId !== null;
  });
  await Promise.all(parentComments.map(comment => {
    return Comments.create(comment);
  }));
  await Promise.all(childComments.map(comment => {
    return Comments.create(comment);
  }));

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${restrooms.length} restrooms`)
  console.log(`seeded ${comments.length} comments`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${ratings.length} ratings`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log("closing db connection")
    await db.close()
    console.log("db connection closed")
  }
}

if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
