const request = require("supertest");
const app = require("../../src/app");
const factory = require("../factories");
const truncate = require("../utils/truncate");

describe("authentication", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("should authenticate with valid credentials", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123123",
    });

    expect(response.status).toBe(200);
  });

  it("should authenticate with invalid credentials", async () => {
    const user = await factory.create("User");

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123123",
    });

    expect(response.status).toBe(401);
  });

  it("get token if authenticate return success", async () => {
    const user = await factory.create("User", {
      password: "123123",
    });

    const response = await request(app).post("/sessions").send({
      email: user.email,
      password: "123123",
    });

    expect(response.body).toHaveProperty("token");
  });
});
