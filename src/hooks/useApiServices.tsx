import axios from 'axios';
export const useApiServices = () => {

    const request = axios.create({
        baseURL: 'https://api.themoviedb.org/3/',
        params: {
            api_key: process.env.API_KEY,
            language: 'pt-BR',
        }
    });
    request.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
            console.log('Sem autorização')
        }
        throw error;
    });
    return {
        request,
    };


}
