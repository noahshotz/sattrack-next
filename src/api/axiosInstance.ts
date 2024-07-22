import axios from 'axios';

const createAxiosInstance = (baseURL: string) => {
    return axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export default createAxiosInstance;
