import { EventHandlerInterface } from '../../../@shared/event/event-handler.interface';
import { EventInterface } from '../../../@shared/event/event.interface';

export class EnviaConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
