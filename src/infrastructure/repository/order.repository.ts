import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { OrderRepositoryInterface } from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.getTotal(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();

    try {
      const result = await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.getTotal(),
        },
        {
          where: { id: entity.id },
          transaction,
        },
      );

      if (result[0] === 0) {
        throw new Error("Order not found");
      }

      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction
      });

      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        })),
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error("Order not found");
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel = null;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const orderItems = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
    );

    const order = new Order(id, orderModel.customer_id, orderItems);
    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      );

      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      );
      return order;
    });

    return orders;
  }
}
