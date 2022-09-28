import { Customer } from '../entities/customer';
import { Order } from '../entities/order';
import { OrderItem } from '../entities/order-item';
import { randomUUID } from 'crypto'

export class OrderService {
  public static getTotal(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.getTotal(), 0);
  }

  public static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) throw new Error('Order must have at least one item');

    const order = new Order(randomUUID(), customer.id, items);
    customer.addRewardPoints(order.getTotal() / 2);
    return order;
  }
}
