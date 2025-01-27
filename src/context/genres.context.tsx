"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApiServices } from '@/hooks/useApiServices';
import { Genre } from '@/types/genre';

interface GenresContextProps {
    genres: Genre[];
    loading: boolean;
    error: string | null;
    getGenreNames: (genreIds: number | undefined | null) => string | undefined;
}

const GenresContext = createContext<GenresContextProps | undefined>(undefined);

export const GenresProvider = ({ children }: { children: ReactNode }) => {
    const { request } = useApiServices();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getGenreNames = (genreIds: number | undefined | null) => {
        return genres.find(genre => genre.id === genreIds)?.name
      };
    
    useEffect(() => {
        if (genres.length > 0) return;
        request.get('/genre/movie/list')
            .then((response) => {
                setGenres(response.data.genres)
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <GenresContext.Provider value={{ genres, loading, error, getGenreNames }}>
            {children}
        </GenresContext.Provider>
    );
};

export const useGenresContext = () => {
    const context = useContext(GenresContext);
    if (context === undefined) {
        throw new Error('useGenresContext must be used within an GenreProvider');
    }
    return context;
};