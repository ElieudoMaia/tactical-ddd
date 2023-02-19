import { Notification } from './notification';

describe("Unit tests for notification", () => {
  it("should create erros", () => {
    const notification = new Notification();

    const error1 = {
      message: "error message 1",
      context: "customer",
    };
    notification.addError(error1);
    expect(notification.messages("customer")).toBe("customer: error message 1")

    const error2 = {
      message: "error message 2",
      context: "customer",
    };
    notification.addError(error2);
    expect(notification.messages("customer")).toBe("customer: error message 1, customer: error message 2")

    const error3 = {
      message: "error message 3",
      context: "order",
    };
    notification.addError(error3);
    expect(notification.messages("customer")).toBe("customer: error message 1, customer: error message 2")

    expect(notification.messages()).toBe("customer: error message 1, customer: error message 2, order: error message 3")
  });
});
