"use client"
import SearchInput from "@/components/SearchInput";
import useFavorites from "@/hooks/useFavorites";
import Image from "next/image";
import React from "react";

export default function Home() {
  const { favorites, loading, error, updateIds } = useFavorites();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center h-auto max-w-prose mx-auto p-4">
      <div className="w-full mb-4">
        <SearchInput handleFavorites={updateIds} />
      </div>
      <div className="w-full">
        {favorites.map(movie => (
          <div key={movie.id} className="flex flex-col md:flex-row items-center md:items-start mb-4 p-4 border border-gray-200 rounded-lg shadow-md">
            <Image width={128} height={192} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-32 h-48 object-cover rounded mb-4 md:mb-0 md:mr-4" />
            <div className="flex w-full flex-col items-center md:items-start">
              <div className="flex w-full justify-between mb-2">
                <h3 className="text-lg font-semibold ">{movie.title}</h3>
                <div className="flex gap-4 items-center">
                  <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" rel="noreferrer" className="text-blue-600 flex gap-2 text-[12px] hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 ">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  <span className="flex self-center justify-self-end" onClick={() => updateIds(movie.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1" stroke="#D2D2D2" fill="currentColor" className={`cursor-pointer size-6 text-yellow-300 hover:text-white`}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2 ">{new Date(movie.release_date).getFullYear()}</p>
              <div className="flex flex-wrap justify-center md:justify-start mb-2">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="text-xs rounded-full px-2 py-1 border border-gray-300 bg-gray-200 mr-1 mb-1">{genre.name}</span>
                ))}
              </div>
              <p className="text-sm text-gray-600">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
