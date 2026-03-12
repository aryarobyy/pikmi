export interface Food {
  id: number;
  storeId: number;
  name: string;
  description: string;
  originalPrice: number;
  rescuePrice: number;
  stock: number;
  expiredAt: Date;
  availableFrom: Date;
  availableUntil: Date;
  createdAt: Date;
  updatedAt: Date;
}
