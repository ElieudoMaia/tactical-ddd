import { Notification } from '../../@shared/notification/notification';

export default interface ProductInterface {
  id: string;
  name: string;
  price: number;
  changeName(name: string): void;
  changePrice(price: number): void;
  notification: Notification;
}
