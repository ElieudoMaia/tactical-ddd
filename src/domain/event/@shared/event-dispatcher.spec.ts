import { CustomerAddressChangedEvent } from '../customer/customer-address-changed.event';
import { CustomerCreatedEvent } from '../customer/customer-created.event';
import { EnviaConsoleLog1Handler } from '../customer/handler/envia-console-log-1-handler';
import { EnviaConsoleLog2Handler } from '../customer/handler/envia-console-log-2-handler';
import { EnviaConsoleLogHandler } from '../customer/handler/envia-console-log.handler';
import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain Events Tests", () => {
  describe("Product Created Event", () => {
    it("should register an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.registerHandler("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.registerHandler("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
      eventDispatcher.unregisterHandler("ProductCreatedEvent", eventHandler);

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
        0
      );
    });

    it("should unregister all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.registerHandler("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);
      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"]
      ).toBeUndefined();
    });

    it("should notify an all event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.registerHandler("ProductCreatedEvent", eventHandler);
      expect(
        eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 100,
      });

      const spyHandle = jest.spyOn(eventHandler, "handle");

      eventDispatcher.notify(productCreatedEvent);

      expect(spyHandle).toBeCalledTimes(1);
      expect(spyHandle).toBeCalledWith(productCreatedEvent);
    });
  });

  describe("Customer Created Event", () => {
    it("should register both event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        2
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toMatchObject([eventHandler1, eventHandler2]);
    });

    it("should unregister both event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler2);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toMatchObject([eventHandler1, eventHandler2]);
      eventDispatcher.unregisterHandler("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.unregisterHandler("CustomerCreatedEvent", eventHandler2);

      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
        0
      );
    });

    it("should notify both event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLog1Handler();
      const eventHandler2 = new EnviaConsoleLog2Handler();

      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler1);
      eventDispatcher.registerHandler("CustomerCreatedEvent", eventHandler2);
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
      ).toMatchObject([eventHandler1, eventHandler2]);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: "Customer created name",
        email: "customer@mail.com",
      });

      const spyHandle1 = jest.spyOn(eventHandler1, "handle");
      const spyHandle2 = jest.spyOn(eventHandler2, "handle");

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyHandle1).toBeCalledTimes(1);
      expect(spyHandle2).toBeCalledTimes(1);
      expect(spyHandle1).toBeCalledWith(customerCreatedEvent);
      expect(spyHandle2).toBeCalledWith(customerCreatedEvent);
    });
  });

  describe("Customer Address Changed Event", () => {
    it("should register the event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLogHandler()

      eventDispatcher.registerHandler("CustomerAddressChangedEvent", eventHandler1);

      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
        1
      );
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toMatchObject([eventHandler1]);
    });

    it("should unregister the event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLogHandler();

      eventDispatcher.registerHandler("CustomerAddressChangedEvent", eventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toMatchObject([eventHandler1]);
      eventDispatcher.unregisterHandler("CustomerAddressChangedEvent", eventHandler1);

      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toBeDefined();
      expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
        0
      );
    });

    it("should notify the event handler", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler1 = new EnviaConsoleLogHandler();

      eventDispatcher.registerHandler("CustomerAddressChangedEvent", eventHandler1);
      expect(
        eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
      ).toMatchObject([eventHandler1]);

      const customerAddressChangedEvent = new CustomerAddressChangedEvent({
        name: "Customer created name",
        email: "customer@mail.com",
      });

      const spyHandle1 = jest.spyOn(eventHandler1, "handle");

      eventDispatcher.notify(customerAddressChangedEvent);

      expect(spyHandle1).toBeCalledTimes(1);
      expect(spyHandle1).toBeCalledWith(customerAddressChangedEvent);
    });
  });
});
