import axios from 'axios';
export const useApiServices = () => {

    const request = axios.create({
        baseURL: 'https://api.themoviedb.org/3/',
        params: {
            api_key: '890580ebea281a7322da2043724cab0f'
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
