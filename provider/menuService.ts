import api from '@/lib/axios';
import { Food } from '@/models/food';

export const getMenu = () => {
    api.get<Food[]>('/menu');
};

