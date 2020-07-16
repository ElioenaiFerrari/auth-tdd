const { User } = require("../../src/models");
const bcrypt = require("bcryptjs");
const truncate = require("../utils/truncate");

describe("user", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("encrypt password", async () => {
    const user = await User.create({
      name: "Elioenai Ferrari",
      email: "elioenai@gmail.com",
      password: "123123",
    });

    // const hash = await bcrypt.hash("123123", 8);
    const isValidCredentials = await bcrypt.compare(
      "123123",
      user.password_hash
    );

    expect(isValidCredentials).toBe(true);
  });
});
