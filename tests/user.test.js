const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const User = require("../models/userModel");

const users = [
  {
    firstName: "Mason",
    lastName: "Kendrick",
    username: "kendrick87",
    email: "mason.kendrick87@fakemail.com",
    password: "M@sonStrongPass87!"
  },
  {
    firstName: "Elara",
    lastName: "Rowan",
    username: "rowan23",
    email: "elara.rowan23@fakemail.com",
    password: "E1araSecurePass23#"
  }
];

let token = null;
let userId = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/register").send({
    firstName: "Luna",
    lastName: "Caldwell",
    username: "luna.caldwel",
    email: "luna.caldwell91@fakemail.com",
    password: "Lun@MoonPass91!"
  });
  token = result.body.token;

  const registeredUser = await User.findOne({ email: "luna.caldwell91@fakemail.com" });
  userId = registeredUser._id.toString();
});

describe("Given there are initially some users saved", () => {
  beforeEach(async () => {
    await User.deleteMany({ username: { $ne: "luna.caldwel" } });
    
    await api.post("/api/users/register").send(users[0]);
    await api.post("/api/users/register").send(users[1]);
  });

  it("should return the user's profile when GET /users/:userId is called with a valid token", async () => {
    await api
      .get(`/api/users/${userId}`)
      .set("Authorization", "bearer " + token)  
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(res => {
        // Additional checks to verify user details
        expect(res.body.firstName).toBe("Luna");
        expect(res.body.lastName).toBe("Caldwell");
        expect(res.body.username).toBe("luna.caldwel");
        expect(res.body.email).toBe("luna.caldwell91@fakemail.com");
      });
  });

  it("should create one user when POST /api/users/register is called", async () => {
    const newUser = {
      firstName: "Avery",
      lastName: "Montgomery",
      username: "montgomery84",
      email: "avery.montgomery84@fakemail.com",
      password: "Av3rySkyPass84!"
    };
    await api
      .post("/api/users/register")  
      .send(newUser)
      .expect(200);
  });

  it("should login a user and return a token when POST /api/users/login is called", async () => {
    const loginUser = {
      email: "mason.kendrick87@fakemail.com",
      password: "M@sonStrongPass87!",
    };

    const response = await api
      .post("/api/users/login") 
      .send(loginUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.token).toBeDefined();

    const loggedInUser = await User.findOne({ email: loginUser.email });

    await api
      .get(`/api/users/${loggedInUser._id.toString()}`)
      .set("Authorization", "bearer " + response.body.token)  
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect(res => {
        // Check that the returned user data matches the logged-in user
        expect(res.body.email).toBe("mason.kendrick87@fakemail.com");
        expect(res.body.username).toBe("kendrick87");
      });
  });
});

afterAll(() => {
  mongoose.connection.close();  
});