"use client"
import { useState, useEffect } from 'react';
import { useApiServices } from '@/hooks/useApiServices';
import { Movie } from '@/types/movie';

const useFavorites = () => {
    const { request } = useApiServices();
    const [favoritesId, setFavoritesIds] = useState<number[]>(typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('favorites') || '[]') : []);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favoritesId]);

    const fetchFavorites = async () => {
        try {
            setLoading(true);
            setError(null);

            const requests = favoritesId.map(id =>
                request.get(`/movie/${id}`)
            );

            const responses = await Promise.all(requests);
            const results = responses.map(response => response.data);

            setFavorites(results);
        } catch (e) {
            console.log(e)
            setError('Tivemos um erro ao buscar seus favoritos');
        } finally {
            setLoading(false);
        }
    };

    const updateIds = (id: number) => {
        if (favoritesId.includes(id)) {
            setFavoritesIds(favoritesId.filter(favId => favId !== id));
            localStorage.setItem('favorites', JSON.stringify(favoritesId.filter(favId => favId !== id)));
        } else {
            
            setFavoritesIds([...favoritesId, id]);
            localStorage.setItem('favorites', JSON.stringify([...favoritesId, id]));
        }
        fetchFavorites()
        
    }
    return { favorites, loading, error, updateIds, favoritesId };
};

export default useFavorites;