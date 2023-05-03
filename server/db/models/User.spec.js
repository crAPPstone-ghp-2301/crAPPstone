/* global describe beforeEach it */

const { expect } = require('chai')
const { db, models: { User } } = require('../index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const seed = require('../../../script/seed');

describe('User model', () => {
  let users;
  beforeEach(async () => {
    await db.sync({ force: true });
    users = (await seed()).users;
  })

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.cody.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT);
        expect(id).to.equal(users.cody.id);
      })
    })

    describe('correctPassword', () => {
      it('returns true if the password is correct', async () => {
        const user = await User.create({
          username: 'johndoe',
          password: 'password123'
        });
        const result = await user.correctPassword('password123');
        expect(result).to.be.true;
      });

      it('returns false if the password is incorrect', async () => {
        const user = await User.create({
          username: 'janedoe',
          password: 'password123'
        });
        const result = await user.correctPassword('wrongpassword');
        expect(result).to.be.false;
      });
    })
  })

  describe('classMethods', () => {
    describe('authenticate', () => {
      let user;
      beforeEach(async () => user = await User.create({
        username: 'john',
        password: 'doe'
      }));
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            username: 'john',
            password: 'doe'
          });
          expect(token).to.be.ok;
        })
      });
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {

          try {
            await User.authenticate({
              username: 'john@gmail.com',
              password: '123'
            });
            throw 'nooo';
          }
          catch (ex) {
            expect(ex.status).to.equal(401);
          }
        })

      });
    }) // end describe('authenticate')

    describe('findByToken', () => {
      let user;
      beforeEach(async () => {
        user = await User.create({
          username: 'jane',
          password: 'doe',
        });
      });
      it('returns a user instance', async () => {
        const token = await user.generateToken();
        const foundUser = await User.findByToken(token);
        expect(foundUser.id).to.equal(user.id);
      });
      it('throws a 401 error for an invalid token', async () => {
        try {
          await User.findByToken('invalid token');
          throw 'nooo';
        }
        catch (ex) {
          expect(ex.status).to.equal(401);
        }
      });
    }) // end describe('findByToken')
  })
}) // end describe('classMethods')