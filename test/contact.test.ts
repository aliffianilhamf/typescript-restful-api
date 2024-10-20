import supertest from "supertest";
import { ContactTest, UserTest } from "./test.utils";
import { app } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await ContactTest.delete();
    await UserTest.delete();
  });

  it("should create contact", async () => {
    const response = await supertest(app)
      .post("/api/contacts")
      .set("X-API-TOKEN", "testing")
      .send({
        first_name: "Aliffian",
        last_name: "Ilham",
        email: "aliffian@mail.com",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Aliffian");
    expect(response.body.data.last_name).toBe("Ilham");
    expect(response.body.data.email).toBe("aliffian@mail.com");
    expect(response.body.data.phone).toBe("081234567890");
  });

  it("should reject if data is invalid", async () => {
    const response = await supertest(app)
      .post("/api/contacts")
      .set("X-API-TOKEN", "testing")
      .send({
        first_name: "Aliffian",
        last_name: "Ilham",
        email: "",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.delete();
    await UserTest.delete();
  });

  it("should get contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(app)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "testing");
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("Aliffian");
    expect(response.body.data.last_name).toBe("Ilham");
    expect(response.body.data.email).toBe("aliffian@mail.com");
    expect(response.body.data.phone).toBe("081234567890");
  });

  it("should reject if contact not found", async () => {
    const response = await supertest(app)
      .get(`/api/contacts/999`)
      .set("X-API-TOKEN", "testing");
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });
  afterEach(async () => {
    await ContactTest.delete();
    await UserTest.delete();
  });

  it("should update contact", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(app)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "testing")
      .send({
        first_name: "Aliffian Ilham",
        last_name: "Febriyana",
        email: "aliffian@mail.com",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(contact.id);
    expect(response.body.data.first_name).toBe("Aliffian Ilham");
    expect(response.body.data.last_name).toBe("Febriyana");
    expect(response.body.data.email).toBe("aliffian@mail.com");
    expect(response.body.data.phone).toBe("081234567890");
  });

  it("should reject if contact not found", async () => {
    const response = await supertest(app)
      .put(`/api/contacts/999`)
      .set("X-API-TOKEN", "testing")
      .send({
        first_name: "Aliffian Ilham",
        last_name: "Febriyana",
        email: "aliffian@mail.com",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if data is invalid", async () => {
    const contact = await ContactTest.get();
    const response = await supertest(app)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "testing")
      .send({
        first_name: "Aliffian Ilham",
        last_name: "Febriyana",
        email: "",
        phone: "081234567890",
      });
    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
