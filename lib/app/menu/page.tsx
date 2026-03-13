'use client';

import { useEffect, useState } from 'react';
import { getMenu } from '@/provider/menuService';
import { Food } from '@/models/food';

export default function MenuPage() {
    const [menus, setMenus] = useState<Food[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                // Memanggil service API
                const response = await getMenu();
                setMenus(response.data);
            } catch (err: any) {
                setError(err.message || 'Gagal mengambil data menu');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    if (loading) return <div>Memuat menu</div>;
    if (error) return <div>Terjadi kesalahan: {error}</div>;

    return (
        <div>
            <h1>Daftar Menu</h1>
            <ul>
                {menus.map((menu) => (
                    <li key={menu.id}>
                        {menu.name} - Rp {menu.originalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
}
