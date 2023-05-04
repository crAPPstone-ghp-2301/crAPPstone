/* global describe beforeEach it */

const { expect } = require("chai");
const {
  db,
  models: { User },
} = require("../index");
const jwt = require("jsonwebtoken");
const seed = require("../../../script/seed");

describe("User model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("User creation", () => {
    let newUser;
    beforeEach(async () => {
      newUser = await User.create({
        username: "testuser",
        password: "testpassword",
        name: "John",
        email: "testuser@example.com",
      });
    });

    it("should create a new user with valid attributes", async () => {
      expect(newUser.id).to.be.a("number");
      expect(newUser.username).to.equal("testuser");
      expect(newUser.name).to.equal("John");
      expect(newUser.email).to.equal("testuser@example.com");
      expect(newUser.isAdmin).to.equal(false);
    });

    it("should encrypt the user password", async () => {
      expect(newUser.password).to.not.equal("testpassword");
      const match = await newUser.correctPassword("testpassword");
      expect(match).to.be.true;
    });

    it("should not create a user with a duplicate username", async () => {
      try {
        await User.create({
          username: "testuser",
          password: "testpassword2",
          name: "Jane",
          email: "testuser2@example.com",
        });
      } catch (error) {
        expect(error.name).to.equal("SequelizeUniqueConstraintError");
      }
    });

    it("should not create a user with an invalid email address", async () => {
      try {
        await User.create({
          username: "testuser2",
          password: "testpassword",
          name: "Jane",
          email: "invalidemail",
        });
      } catch (error) {
        expect(error.name).to.equal("SequelizeValidationError");
      }
    });
  });
});