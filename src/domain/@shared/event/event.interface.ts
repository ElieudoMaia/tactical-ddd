export interface EventInterface<T = any> {
  dataTimeOccurred: Date;
  eventData: T;
}
