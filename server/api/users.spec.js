const { expect } = require('chai')
const request = require('supertest')
const { db, models: { User } } = require('../db')
const seed = require('../../script/seed');
const app = require('../app')
const bcrypt = require("bcrypt");

describe('User routes', () => {
  before(async () => {
    await db.sync({ force: true })
    await seed()
  })

  after(async () => {
    await db.close()
  })

  describe('GET /api/users', () => {
    it('responds with an array of all users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(2)
    })
  })

  describe('GET /api/users/:id', () => {
    it('responds with a single user', async () => {
      const user = await User.create({ name: 'Test User', email: 'test@example.com', password: 'testpassword' })

      const res = await request(app)
        .get(`/api/users/${user.id}`)
        .expect(200)

      expect(res.body.name).to.equal('Test User')
      expect(res.body.email).to.equal('test@example.com')
    })

    it('responds with a 404 error if user is not found', async () => {
      const res = await request(app)
        .get('/api/users/999')
        .expect(404)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
