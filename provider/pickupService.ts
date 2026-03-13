import apiHandler from '@/lib/axios';
import { PickupOrder } from '@/models/pickup';

const PICKUP = '/pickup';

interface CreatePickupData {
  storeId: number;
  pickupTime: string;
  items: { foodId: number; quantity: number }[];
}

// Buat pesanan pickup baru
export const createPickupOrder = async (data: CreatePickupData) => {
  const res = await apiHandler.post<PickupOrder>(PICKUP, data);
  return res.data;
};

// Ambil semua pesanan pickup milik user yang sedang login
export const getMyPickupOrders = async () => {
  const res = await apiHandler.get<PickupOrder[]>(PICKUP);
  return res.data;
};

// Ambil detail pesanan pickup berdasarkan ID
export const getPickupOrderById = async (id: number) => {
  const res = await apiHandler.get<PickupOrder>(`${PICKUP}/${id}`);
  return res.data;
};

// Batalkan pesanan pickup
export const cancelPickupOrder = async (id: number) => {
  const res = await apiHandler.patch<PickupOrder>(`${PICKUP}/${id}/cancel`);
  return res.data;
};
