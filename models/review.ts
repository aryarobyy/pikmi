export interface Review {
  id: number;
  userId: number;
  storeId: number;
  foodId: number;
  rating: boolean;
  comment: string;
  createdAt: Date;
}
