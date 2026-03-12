export enum Role {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export enum PickupStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum UserFoodAction {
  VIEW = 'VIEW',
  PICKUP = 'PICKUP',
  FAVORITE = 'FAVORITE',
  RATE = 'RATE',
}

export enum NotificationType {
  FOOD_EXPIRING = 'FOOD_EXPIRING',
  NEW_DISCOUNT = 'NEW_DISCOUNT',
  PICKUP_REMINDER = 'PICKUP_REMINDER',
}
