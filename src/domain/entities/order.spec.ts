import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("customerId is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("items are required");
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100);
    const item2 = new OrderItem("i2", "Item 2", 200);
    const order = new Order("o1", "c1", [item]);

    let total = order.getTotal();

    expect(order.getTotal()).toBe(100);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.getTotal();
    expect(total).toBe(300);
  });
});
