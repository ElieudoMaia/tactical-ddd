import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { Product } from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      ProductModel,
      CustomerModel,
      OrderModel,
      OrderItemModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.getTotal(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should throw if no order was found by id", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("123")).rejects.toThrow();
  });

  it("should get order by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await orderRepository.find(order.id);
    expect(orderModel).toStrictEqual(order);
  });

  it("should get all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem1 = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );

    const order1 = new Order("123", "123", [ordemItem1]);
    const order2 = new Order("456", "123", [ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();
    expect(orders).toStrictEqual([order1, order2]);
  });

  it("should throw if no order was found to update", async () => {
    const orderRepository = new OrderRepository();
    const ordemItem = new OrderItem(
      "2",
      "any_product_name",
      10,
      'any_product_id',
      2
    );

    const order = new Order("123", "123", [ordemItem]);
    await expect(orderRepository.update(order)).rejects.toThrow();
  });
  it("should update order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const customer2 = new Customer("456", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer2.changeAddress(address);
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const newOrdemItem = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      3
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const updatedOrder = new Order("123", "456", [newOrdemItem]);

    await orderRepository.update(updatedOrder);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.customer_id).toBe("456");
    expect(orderModel.items.length).toBe(1);
    expect(orderModel.toJSON().items[0].id).toEqual(updatedOrder.items[0].id);
  });
});
