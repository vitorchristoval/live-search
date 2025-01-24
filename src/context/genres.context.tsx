"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApiServices } from '@/hooks/useApiServices';
import { Genre } from '@/types/genre';

interface GenresContextProps {
    genres: Genre[];
    loading: boolean;
    error: string | null;
}

const GenresContext = createContext<GenresContextProps | undefined>(undefined);

export const GenresProvider = ({ children }: { children: ReactNode }) => {
    const { request } = useApiServices();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }, []);

    return (
        <GenresContext.Provider value={{ genres, loading, error }}>
            {children}
        </GenresContext.Provider>
    );
};

export const useGenresContext = () => {
    const context = useContext(GenresContext);
    if (context === undefined) {
        throw new Error('useGenresContext must be used within an ApiProvider');
    }
    return context;
};