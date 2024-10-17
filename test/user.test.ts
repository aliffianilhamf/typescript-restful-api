import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "../src/application/web";
import { UserTest } from "./test.utils";

describe("POST /api/users", () => {
  // selalu hapus user test setelah test
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(app).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/users").send({
      username: "testing",
      password: "testing",
      name: "testing",
    });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("testing");
  });
});
