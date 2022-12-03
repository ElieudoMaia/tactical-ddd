import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  registerHandler(eventName: string, handler: EventHandlerInterface): void;
  unregisterHandler(eventName: string, handler: EventHandlerInterface): void;
  unregisterAll(): void;
}
