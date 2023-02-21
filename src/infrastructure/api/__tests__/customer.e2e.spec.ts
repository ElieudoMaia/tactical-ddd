import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E teste for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
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

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.address.street).toBe("Street 1");
    expect(response.body.address.city).toBe("City 1");
    expect(response.body.address.number).toBe(1);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
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
    expect(response.status).toBe(201);
    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "John Doe 2",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1,
          zip: "54321",
        },
      });
    expect(response2.status).toBe(201);

    const responseList = await request(app).get("/customer").send();
    expect(responseList.status).toBe(200);
    expect(responseList.body.customers.length).toBe(2);
    const customer = responseList.body.customers[0];
    expect(customer.name).toBe("John Doe");
    expect(customer.address.street).toBe("Street 1");
    expect(customer.address.city).toBe("City 1");
    expect(customer.address.number).toBe(1);
    expect(customer.address.zip).toBe("12345");
    const customer2 = responseList.body.customers[1];
    expect(customer2.name).toBe("John Doe 2");
    expect(customer2.address.street).toBe("Street 2");
    expect(customer2.address.city).toBe("City 2");
    expect(customer2.address.number).toBe(1);
    expect(customer2.address.zip).toBe("54321");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Doe</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>Street 1</street>`);
    expect(listResponseXML.text).toContain(`<city>City 1</city>`);
    expect(listResponseXML.text).toContain(`<number>1</number>`);
    expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John Doe 2</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
    expect(listResponseXML.text).toContain(`<city>City 2</city>`);
    expect(listResponseXML.text).toContain(`<number>1</number>`);
    expect(listResponseXML.text).toContain(`<zip>54321</zip>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);
  });
});
