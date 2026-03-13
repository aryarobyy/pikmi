import apiHandler from '@/lib/axios';
import { FoodModel } from '@/models/food';

export const getMenu = () => {
    return apiHandler.get<FoodModel[]>('/menu');
};

