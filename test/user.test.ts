import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "../src/application/web";
import { UserTest } from "./test.utils";
import bcrypt from "bcrypt";

// untuk mengelompokkan test yang akan menguji API endpoint POST /api/users.
describe("POST /api/users", () => {
  // dipanggil setelah setiap test dijalankan.
  afterEach(async () => {
    // hapus user test yang mungkin dibuat selama pengujian.
    // Ini membantu menjaga agar database tetap bersih setelah setiap test selesai dijalankan.
    await UserTest.delete();
  });
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(app).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    // mencatat response body ke dalam log, membantu dalam debugging jika terjadi masalah selama pengujian.
    logger.debug(response.body);
    // mengecek apakah status respons adalah 400, yang menunjukkan bahwa server menolak request tersebut (bad request).
    expect(response.status).toBe(400);
    //  mengecek bahwa respons body-nya ada, untuk memastikan bahwa ada pesan kesalahan atau detail tambahan yang dikirimkan oleh server.
    expect(response.body.errors).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/users").send({
      username: "testing",
      password: "testing",
      name: "testing",
    });
    //mencatat response body ke dalam log, membantu dalam debugging jika terjadi masalah selama pengujian.
    logger.debug(response.body);
    // mengecek apakah status respons adalah 200, yang menunjukkan bahwa operasi berhasil.
    expect(response.status).toBe(200);
    // mengecek apakah user yang dikembalikan dalam response memiliki data yang sama dengan yang dikirimkan.
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("testing");
  });
});

describe("POST /api/users/login", () => {
  // buat user baru sebelum setiap test dijalankan.
  beforeEach(async () => {
    await UserTest.create();
  });
  // hapus user setelah setiap test dijalankan.
  afterEach(async () => {
    await UserTest.delete();
  });
  // test case untuk login user (success).
  it("should login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      username: "testing",
      password: "testing",
    });
    // mencatat response body ke dalam log, membantu dalam debugging jika terjadi masalah selama pengujian.
    logger.debug(response.body);
    // mengecek apakah status respons adalah 200, yang menunjukkan bahwa operasi berhasil.
    expect(response.status).toBe(200);
    // mengecek apakah user yang dikembalikan dalam response memiliki data yang sama dengan yang dikirimkan.
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("testing");
    expect(response.body.data.token).toBeDefined();
  });

  // test case untuk login user (failed).
  it("should reject login if username is wrong", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      username: "wrong",
      password: "testing",
    });
    // mencatat response body ke dalam log, membantu dalam debugging jika terjadi masalah selama pengujian.
    logger.debug(response.body);
    // mengecek apakah status respons adalah 400, yang menunjukkan bahwa server menolak request tersebut (bad request).
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  // test case untuk login user (failed).
  it("should reject login if password is wrong", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      username: "testing",
      password: "wrong",
    });
    // mencatat response body ke dalam log, membantu dalam debugging jika terjadi masalah selama pengujian.
    logger.debug(response.body);
    // mengecek apakah status respons adalah 400, yang menunjukkan bahwa server menolak request tersebut (bad request).
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should get current user", async () => {
    const response = await supertest(app)
      .get("/api/users/current")
      .set("X-API-TOKEN", "testing");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("testing");
  });

  it("should reject if token is wrong", async () => {
    const response = await supertest(app)
      .get("/api/users/current")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should update current user", async () => {
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "testing")
      .send({
        name: "updated",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("testing");
    expect(response.body.data.name).toBe("updated");
  });

  it("should reject if token is wrong", async () => {
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "wrong")
      .send({
        name: "updated",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "testing")
      .send({
        name: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if password is invalid", async () => {
    const response = await supertest(app)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "testing")
      .send({
        password: "testingbenar",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    const user = await UserTest.get();
    expect(await bcrypt.compare("testingbenar", user.password)).toBe(true);
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should logout user", async () => {
    const response = await supertest(app)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "testing");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
    const user = await UserTest.get();
    expect(user.token).toBeNull();
  });

  it("should reject if token is wrong", async () => {
    const response = await supertest(app)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
