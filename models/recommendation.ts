export interface UserRecommendation {
  id: number;
  userId: number;
  foodId: number;
  storeId: number;
  score: number;
  reason: string;
  generatedAt: Date;
  createdAt: Date;
}
