export type NotificationError = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  messages(context?: string) {
    let filteredErrors = this.errors;
    if (context) {
      filteredErrors = filteredErrors.filter(
        (error) => error.context === context
      );
    }
    return filteredErrors
      .map((error) => `${error.context}: ${error.message}`)
      .join(", ");
  }
}
