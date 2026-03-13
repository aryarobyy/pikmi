import apiHandler from '@/lib/axios';
import { FoodModel } from '@/models/food';
import { Store } from '@/models/store';

const SEARCH = '/search';
const MENU = '/app/api/menu';

// Cari makanan berdasarkan keyword
export const searchFood = async (keyword: string) => {
    const res = await apiHandler.get<FoodModel[]>(MENU, {
        params: { q: keyword },
    });
    return res.data;
};

// // Cari store berdasarkan keyword
// export const searchStore = async (keyword: string) => {
//   const res = await apiHandler.get<Store[]>(`${SEARCH}/stores`, {
//     params: { q: keyword },
//   });
//   return res.data;
// };

// // Cari semua (food + store) berdasarkan keyword
// export const searchAll = async (keyword: string) => {
//   const res = await apiHandler.get<{ foods: FoodModel[]; stores: Store[] }>(`${SEARCH}`, {
//     params: { q: keyword },
//   });
//   return res.data;
// };
