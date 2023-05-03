'use strict'

const { db, models: { User, Restroom, Ratings, Review, Comments } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */


//creating restrooms
const restrooms = [
  {
    id: 1,
    name: 'Central Park Restroom',
    openingHours: '8:00am-10:00pm',
    description: 'A clean public restroom located in Central Park.',
    address: 'Central Park, New York, NY, USA',
    placeType: 'Park',
    latitude: '40.7829',
    longitude: '-73.9654',
    capacity: 10,
    isLocked: false,
    code: '1234',
    isBusy: false,
    lastUpdate: new Date('2022-01-01T10:00:00.000Z'),
    createdAt: new Date('2022-01-01T10:00:00.000Z')
  },
  {
    id: 2,
    name: 'Starbucks Restroom',
    openingHours: '7:00am-9:00pm',
    description: 'A restroom located inside a Starbucks coffee shop.',
    address: '123 Main St, Seattle, WA, USA',
    placeType: 'Coffee Shop',
    latitude: '47.6062',
    longitude: '-122.3321',
    capacity: 5,
    isLocked: true,
    code: '4321',
    isBusy: true,
    lastUpdate: new Date('2022-01-02T10:00:00.000Z'),
    createdAt: new Date('2022-01-02T10:00:00.000Z')
  },
  {
    id: 3,
    name: 'Mall Restroom',
    openingHours: '10:00am-8:00pm',
    description: 'A public restroom located inside a shopping mall.',
    address: '456 Oak St, Los Angeles, CA, USA',
    placeType: 'Shopping Mall',
    latitude: '34.0522',
    longitude: '-118.2437',
    capacity: 15,
    isLocked: false,
    code: '2468',
    isBusy: false,
    lastUpdate: new Date('2022-01-03T10:00:00.000Z'),
    createdAt: new Date('2022-01-03T10:00:00.000Z')
  },
  {
    id: 4,
    name: 'Airport Restroom',
    openingHours: '24/7',
    description: 'A restroom located inside an airport.',
    address: '789 International Blvd, Atlanta, GA, USA',
    placeType: 'Airport',
    latitude: '33.6367',
    longitude: '-84.4281',
    capacity: 20,
    isLocked: true,
    code: '1357',
    isBusy: true,
    lastUpdate: new Date('2022-01-04T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  },
  {
    id: 5,
    name: 'Hotel Restroom',
    openingHours: '24/7',
    description: 'A clean restroom located inside a hotel.',
    address: '987 Broadway, San Francisco, CA, USA',
    placeType: 'Hotel',
    latitude: '37.7749',
    longitude: '-122.4194',
    capacity: 8,
    isLocked: false,
    code: '8642',
    isBusy: false,
    lastUpdate: new Date('2022-01-05T10:00:00.000Z'),
    createdAt: new Date('2022-01-04T10:00:00.000Z')
  }
]

//creating ratings
const ratings = [
  {
    id: 1,
    restroomId: 1,
    userId: 1,
    userRating: 4.5,
    isClean: true,
    userRatingsTotal: 20,
  },
  {
    id: 2,
    restroomId: 2,
    userId: 2,
    userRating: 3.2,
    isClean: false,
    userRatingsTotal: 10,
  },
  {
    id: 3,
    restroomId: 3,
    userId: 3,
    userRating: 4.0,
    isClean: true,
    userRatingsTotal: 15,
  },
  {
    id: 4,
    restroomId: 4,
    userId: 4,
    userRating: 2.5,
    isClean: false,
    userRatingsTotal: 8,
  },
  {
    id: 5,
    restroomId: 5,
    userId: 5,
    userRating: 5.0,
    isClean: true,
    userRatingsTotal: 30,
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
    reportStatus: false,
    rating: 4.5,
    totalRatings: 20,
    created_at: "2022-04-20 12:00:00",
    commentId: 1,
  },
  {
    id: 2,
    restroomId: 2,
    userId: 2,
    imageURL: "https://example.com/image2.png",
    reviewText: "This restroom is not very clean.",
    reportStatus: true,
    rating: 3.2,
    createdAt: "2022-05-01 10:30:00",
    totalRatings: 10,
    commentId: 2,
  },
  {
    id: 3,
    restroomId: 3,
    userId: 3,
    imageURL: null,
    reviewText: "This is an average restroom.",
    reportStatus: true,
    rating: 3.8,
    createdAt: "2022-05-02 15:20:00",
    totalRatings: 15,
    commentId: 3,
  },
  {
    id: 4,
    restroomId: 4,
    userId: 4,
    imageURL: "https://example.com/image4.png",
    reviewText: "This restroom is in bad condition.",
    reportStatus: false,
    rating: 2.5,
    totalRatings: 8,
    createdAt: "2022-05-03 18:40:00",
    commentId: 4,
  },
  {
    id: 5,
    restroomId: 5,
    userId: 5,
    imageURL: null,
    reviewText: "This is the best restroom ever!",
    reportStatus: true,
    rating: 5.0,
    createdAt: "2022-05-03 23:10:00",
    totalRatings: 30,
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
    comment: 'Great review, thanks for sharing!',
    createdAt: '2022-05-01 10:30:00',
    likes: 3
  },
  {
    id: 2,
    parentCommentId: null,
    userId: 3,
    reviewId: 1,
    comment: 'I completely agree with your review, it was a great experience!',
    createdAt: '2022-05-01 12:15:00',
    likes: 5
  },
  {
    id: 3,
    parentCommentId: null,
    userId: 2,
    reviewId: 2,
    comment: 'Thanks for sharing this review, I found it really helpful!',
    createdAt: '2022-05-02 08:45:00',
    likes: 2
  },
  {
    id: 4,
    parentCommentId: 1,
    userId: 4,
    reviewId: null,
    comment: 'I second that, great review!',
    createdAt: '2022-05-03 14:10:00',
    likes: 1
  },
  {
    id: 5,
    parentCommentId: null,
    userId: 1,
    reviewId: 3,
    comment: 'Thank you for your review, I had a great time at this location as well!',
    createdAt: '2022-05-04 11:20:00',
    likes: 0
  }
  //Note that the parent_comment_id is null for top-level comments, but for replies, it contains the ID of the parent comment.
]




console.log(`seeded ${restrooms.length} users`)
console.log(`seeded ${comments.length} users`)
console.log(`seeded ${reviews.length} users`)
console.log(`seeded ${ratings.length} users`)
console.log(`seeded successfully`)


/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
const seed = async () => {
  await db.sync({ force: true }); // clears db and matches models to tables
  try {
    // Creating Users
    const users = await Promise.all([
      User.create({
        id: 1,
        username: 'john_doe',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        isAdmin: true,
        createdAt: new Date('2022-01-01T10:00:00.000Z'),
        lastLogin: new Date('2022-01-01T10:00:00.000Z')
      }),
      User.create({
        id: 2,
        username: 'jane_smith',
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password456',
        isAdmin: false,
        createdAt: new Date('2022-01-02T10:00:00.000Z'),
        lastLogin: new Date('2022-01-02T10:00:00.000Z')
      }),
      User.create({
        id: 3,
        username: 'bob_johnson',
        name: 'Bob Johnson',
        email: 'bobjohnson@example.com',
        password: 'password789',
        isAdmin: false,
        createdAt: new Date('2022-01-03T10:00:00.000Z'),
        lastLogin: new Date('2022-01-03T10:00:00.000Z')
      }),
      User.create({
        id: 4,
        username: 'kate_wilson',
        name: 'Kate Wilson',
        email: 'katewilson@example.com',
        password: 'password123',
        isAdmin: false,
        createdAt: new Date('2022-01-04T10:00:00.000Z'),
        lastLogin: new Date('2022-01-04T10:00:00.000Z')
      }),
      User.create({
        id: 5,
        username: 'alex_miller',
        name: 'Alex Miller',
        email: 'alexmiller@example.com',
        password: 'password456',
        isAdmin: true,
        createdAt: new Date('2022-01-05T10:00:00.000Z'),
        lastLogin: new Date('2022-01-05T10:00:00.000Z')
      })
    ])
    console.log(`seeded ${users.length} users`)
    await Promise.all(restrooms.map(restroom => {
      return Restroom.create(restroom);
    }));
    await Promise.all(ratings.map(rating => {
      return Ratings.create(rating);
    }));
    await Promise.all(reviews.map(review => {
      return Review.create(review);
    }));
    await Promise.all(comments.map(comment => {
      return Comments.create(comment);
    }));
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
seed()

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
