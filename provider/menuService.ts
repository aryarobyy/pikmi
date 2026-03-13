import api from '@/lib/axios';
import { Food } from '@/models/food';

export const getMenu = () => {
    return api.get<Food[]>('/menu');
};

