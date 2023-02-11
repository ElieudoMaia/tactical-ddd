import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E teste for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "Street 1",
          city: "City 1",
          number: 1,
          zip: "12345",
        },
      });

    console.log('reposta do teste end to end', response.body)

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.city).toBe("City 1");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("12345");
  });
});
