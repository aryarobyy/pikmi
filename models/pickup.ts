import { PickupStatus } from './enum';

export interface PickupOrder {
  id: number;
  userId: number;
  storeId: number;
  status: PickupStatus;
  pickupTime: Date;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PickupOrderItem {
  id: number;
  pickupOrderId: number;
  foodId: number;
  quantity: number;
  price: number;
}
