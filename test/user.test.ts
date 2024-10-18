import supertest from "supertest";
import { logger } from "../src/application/logging";
import { app } from "../src/application/web";
import { UserTest } from "./test.utils";

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
