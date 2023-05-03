'use strict'

const {db, models: {User, Restrooms, Favorites, Ratings, Reviews, Comments} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = [
    {
      id: 1,
      username: 'john_doe',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      created_at: new Date('2022-01-01T10:00:00.000Z'),
      last_login: new Date('2022-01-01T10:00:00.000Z')
    },
    {
      id: 2,
      username: 'jane_smith',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password456',
      created_at: new Date('2022-01-02T10:00:00.000Z'),
      last_login: new Date('2022-01-02T10:00:00.000Z')
    },
    {
      id: 3,
      username: 'bob_johnson',
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      password: 'password789',
      created_at: new Date('2022-01-03T10:00:00.000Z'),
      last_login: new Date('2022-01-03T10:00:00.000Z')
    },
    {
      id: 4,
      username: 'kate_wilson',
      name: 'Kate Wilson',
      email: 'katewilson@example.com',
      password: 'password123',
      created_at: new Date('2022-01-04T10:00:00.000Z'),
      last_login: new Date('2022-01-04T10:00:00.000Z')
    },
    {
      id: 5,
      username: 'alex_miller',
      name: 'Alex Miller',
      email: 'alexmiller@example.com',
      password: 'password456',
      created_at: new Date('2022-01-05T10:00:00.000Z'),
      last_login: new Date('2022-01-05T10:00:00.000Z')
    }
  ];
  //creating restrooms
  const restrooms = [
    {
      id: 1,
      name: 'Central Park Restroom',
      opening_hours: '8:00am-10:00pm',
      description: 'A clean public restroom located in Central Park.',
      address: 'Central Park, New York, NY, USA',
      place_type: 'Park',
      latitude: '40.7829',
      longitude: '-73.9654',
      capacity: 10,
      isLocked: false,
      code: '1234',
      isBusy: false,
      last_update: new Date('2022-01-01T10:00:00.000Z'),
      created_at: new Date('2022-01-01T10:00:00.000Z')
    },
    {
      id: 2,
      name: 'Starbucks Restroom',
      opening_hours: '7:00am-9:00pm',
      description: 'A restroom located inside a Starbucks coffee shop.',
      address: '123 Main St, Seattle, WA, USA',
      place_type: 'Coffee Shop',
      latitude: '47.6062',
      longitude: '-122.3321',
      capacity: 5,
      isLocked: true,
      code: '4321',
      isBusy: true,
      last_update: new Date('2022-01-02T10:00:00.000Z'),
      created_at: new Date('2022-01-02T10:00:00.000Z')
    },
    {
      id: 3,
      name: 'Mall Restroom',
      opening_hours: '10:00am-8:00pm',
      description: 'A public restroom located inside a shopping mall.',
      address: '456 Oak St, Los Angeles, CA, USA',
      place_type: 'Shopping Mall',
      latitude: '34.0522',
      longitude: '-118.2437',
      capacity: 15,
      isLocked: false,
      code: '2468',
      isBusy: false,
      last_update: new Date('2022-01-03T10:00:00.000Z'),
      created_at: new Date('2022-01-03T10:00:00.000Z')
    },
    {
      id: 4,
      name: 'Airport Restroom',
      opening_hours: '24/7',
      description: 'A restroom located inside an airport.',
      address: '789 International Blvd, Atlanta, GA, USA',
      place_type: 'Airport',
      latitude: '33.6367',
      longitude: '-84.4281',
      capacity: 20,
      isLocked: true,
      code: '1357',
      isBusy: true,
      last_update: new Date('2022-01-04T10:00:00.000Z'),
      created_at: new Date('2022-01-04T10:00:00.000Z')
    },
    {
      id: 5,
      name: 'Hotel Restroom',
      opening_hours: '24/7',
      description: 'A clean restroom located inside a hotel.',
      address: '987 Broadway, San Francisco, CA, USA',
      place_type: 'Hotel',
      latitude: '37.7749',
      longitude: '-122.4194',
      capacity: 8,
      isLocked: false,
      code: '8642',
      isBusy: false,
      last_update: new Date('2022-01-05T10:00:00.000Z'),
      created_at: new Date('2022-01-04T10:00:00.000Z')
    }
  ]
  //creating favorites
  const favorites = [
    {
      id: 1,
      users_id: 1,
      restrooms_id: 2
    },
    {
      id: 2,
      users_id: 1,
      restrooms_id: 3
    },
    {
      id: 3,
      users_id: 2,
      restrooms_id: 1
    },
    {
      id: 4,
      users_id: 2,
      restrooms_id: 4
    },
    {
      id: 5,
      users_id: 3,
      restrooms_id: 5
    }
  ]
  //creating ratings
  const ratings = [
    {
      id: 1,
      restroom_id: 1,
      user_id: 1,
      user_rating: 4.5,
      isClean: true,
      user_ratings_total: 20,
    },
    {
      id: 2,
      restroom_id: 2,
      user_id: 2,
      user_rating: 3.2,
      isClean: false,
      user_ratings_total: 10,
    },
    {
      id: 3,
      restroom_id: 3,
      user_id: 3,
      user_rating: 4.0,
      isClean: true,
      user_ratings_total: 15,
    },
    {
      id: 4,
      restroom_id: 4,
      user_id: 4,
      user_rating: 2.5,
      isClean: false,
      user_ratings_total: 8,
    },
    {
      id: 5,
      restroom_id: 5,
      user_id: 5,
      user_rating: 5.0,
      isClean: true,
      user_ratings_total: 30,
    }
  ]
  //creating reviews
  const reviews = [
    {
      id: 1,
      restroom_id: 1,
      user_id: 1,
      image_URL: "https://example.com/image1.png",
      review: "This is a great restroom!",
      report_status: ["spam"],
      rating: 4.5,
      total_ratings: 20,
      created_at: "2022-04-20 12:00:00",
      comment_id: 1,
    },
    {
      id: 2,
      restroom_id: 2,
      user_id: 2,
      image_URL: "https://example.com/image2.png",
      review: "This restroom is not very clean.",
      report_status: [],
      rating: 3.2,
      total_ratings: 10,
      created_at: "2022-05-01 10:30:00",
      comment_id: 2,
    },
    {
      id: 3,
      restroom_id: 3,
      user_id: 3,
      image_URL: null,
      review: "This is an average restroom.",
      report_status: [],
      rating: 3.8,
      total_ratings: 15,
      created_at: "2022-05-02 15:20:00",
      comment_id: 3,
    },
    {
      id: 4,
      restroom_id: 4,
      user_id: 4,
      image_URL: "https://example.com/image4.png",
      review: "This restroom is in bad condition.",
      report_status: ["offensive"],
      rating: 2.5,
      total_ratings: 8,
      created_at: "2022-05-03 18:40:00",
      comment_id: 4,
    },
    {
      id: 5,
      restroom_id: 5,
      user_id: 5,
      image_URL: null,
      review: "This is the best restroom ever!",
      report_status: ["spam", "offensive"],
      rating: 5.0,
      total_ratings: 30,
      created_at: "2022-05-03 23:10:00",
      comment_id: 5,
    }
  ]
  //creating comments
  const comments=[
    {
      id: 1,
      parent_comment_id: null,
      user_id: 1,
      review_id: 1,
      comment: 'Great review, thanks for sharing!',
      created_at: '2022-05-01 10:30:00',
      likes: 3
    },
    {
      id: 2,
      parent_comment_id: null,
      user_id: 3,
      review_id: 1,
      comment: 'I completely agree with your review, it was a great experience!',
      created_at: '2022-05-01 12:15:00',
      likes: 5
    },
    {
      id: 3,
      parent_comment_id: null,
      user_id: 2,
      review_id: 2,
      comment: 'Thanks for sharing this review, I found it really helpful!',
      created_at: '2022-05-02 08:45:00',
      likes: 2
    },
    {
      id: 4,
      parent_comment_id: 1,
      user_id: 4,
      review_id: null,
      comment: 'I second that, great review!',
      created_at: '2022-05-03 14:10:00',
      likes: 1
    },
    {
      id: 5,
      parent_comment_id: null,
      user_id: 1,
      review_id: 3,
      comment: 'Thank you for your review, I had a great time at this location as well!',
      created_at: '2022-05-04 11:20:00',
      likes: 0
    }
    //Note that the parent_comment_id is null for top-level comments, but for replies, it contains the ID of the parent comment.
  ]
  
   
  
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await Promise.all(users.map(user => {
      return Users.create(user);
    }));
    await Promise.all(restrooms.map(restroom => {
      return Restrooms.create(restroom);
    }));
    await Promise.all(favorites.map(favorite => {
      return Favorites.create(favorite);
    }));
    await Promise.all(ratings.map(rating => {
      return Ratings.create(rating);
    }));
    await Promise.all(reviews.map(review => {
      return Reviews.create(review);
    }));
    await Promise.all(comments.map(comment => {
      return Comments.create(comment);
    }));
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
