import { Address } from "./domain/entities/address";
import { Customer } from "./domain/entities/customer";
import { Order } from "./domain/entities/order";
import { OrderItem } from "./domain/entities/order-item";

const customer = new Customer("123", "Elieudo Maia");
const address = new Address("Rua", 2, "63560000", "Acopiara");

customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Arroz", 5);
const item2 = new OrderItem("2", "Feijão", 8);
const item3 = new OrderItem("3", "Batata", 10);

const order = new Order("1", customer.id, [item1, item2, item3]);

console.log(order);
console.log(order.getTotal());
